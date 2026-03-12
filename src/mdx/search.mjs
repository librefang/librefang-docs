import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import glob from 'fast-glob';
import { toString as mdastToString } from 'mdast-util-to-string';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { createLoader } from 'simple-functional-loader';
import { filter } from 'unist-util-filter';
import { SKIP, visit } from 'unist-util-visit';

const __filename = url.fileURLToPath(import.meta.url);
const processor = remark().use(remarkMdx).use(extractSections);
const slugify = slugifyWithCounter();

function isObjectExpression(node) {
	return (
		node.type === 'mdxTextExpression' &&
		node.data &&
		node.data.estree &&
		node.data.estree.body &&
		node.data.estree.body[0] &&
		node.data.estree.body[0].expression &&
		node.data.estree.body[0].expression.type === 'ObjectExpression'
	);
}

function excludeObjectExpressions(tree) {
	return filter(tree, (node) => !isObjectExpression(node));
}

function extractSections() {
	return (tree, params) => {
		const sections = params.sections;
		slugify.reset();

		visit(tree, (node) => {
			if (node.type === 'heading' || node.type === 'paragraph') {
				const content = mdastToString(excludeObjectExpressions(node));
				if (node.type === 'heading' && node.depth <= 2) {
					const hash = node.depth === 1 ? null : slugify(content);
					sections.push([content, hash, []]);
				} else {
					if (sections.length > 0) {
						sections[sections.length - 1][2].push(content);
					}
				}
				return SKIP;
			}
		});
	};
}

export default function Search(nextConfig) {
	const config = nextConfig || {};
	const cache = new Map();
	const baseWebpack = config.webpack;

	return Object.assign({}, config, {
		webpack: (webpackConfig, options) => {
			webpackConfig.module.rules.push({
				test: __filename,
				use: [
					createLoader(function () {
						const appDir = path.resolve('./src/app');
						this.addContextDependency(appDir);

						const files = glob.sync('**/*.mdx', { cwd: appDir });
						const data = files.map((file) => {
							const url = `/${file.replace(/(^|\/)page\.mdx$/, '')}`;
							const mdx = fs.readFileSync(path.join(appDir, file), 'utf8');

							let sections = [];
							const cached = cache.get(file);

							if (cached && cached[0] === mdx) {
								sections = cached[1];
							} else {
								const vfile = { value: mdx, sections };
								processor.runSync(processor.parse(vfile), vfile);
								cache.set(file, [mdx, sections]);
							}

							return { url, sections };
						});

						return (
							"import FlexSearch from 'flexsearch'\n\nvar sectionIndex = new FlexSearch.Document({\n  tokenize: 'full',\n  document: {\n    id: 'url',\n    index: 'content',\n    store: ['title', 'pageTitle'],\n  },\n  context: {\n    resolution: 9,\n    depth: 2,\n    bidirectional: true\n  }\n})\n\nvar data = " +
							JSON.stringify(data) +
							"\n\nfor (var i = 0; i < data.length; i++) {\n  var item = data[i];\n  var url = item.url;\n  var sections = item.sections;\n  for (var j = 0; j < sections.length; j++) {\n    var section = sections[j];\n    var title = section[0];\n    var hash = section[1];\n    var content = section[2];\n    sectionIndex.add({\n      url: url + (hash ? ('#' + hash) : ''),\n      title: title,\n      content: [title].concat(content).join('\\\\n'),\n      pageTitle: hash ? sections[0][0] : undefined,\n    })\n  }\n}\n\nexport function search(query, options) {\n  var opts = options || {};\n  var searchOptions = Object.assign({}, opts, {\n    enrich: true,\n  });\n  var result = sectionIndex.search(query, searchOptions);\n  if (result.length === 0) {\n    return []\n  }\n  return result[0].result.map(function(item) {\n    return {\n      url: item.id,\n      title: item.doc.title,\n      pageTitle: item.doc.pageTitle,\n    }\n  })\n}"
						);
					}),
				],
			});

			if (typeof baseWebpack === 'function') {
				return baseWebpack(webpackConfig, options);
			}

			return webpackConfig;
		},
	});
}
