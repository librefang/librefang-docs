import { slugifyWithCounter } from '@sindresorhus/slugify';
import * as acorn from 'acorn';
import { fromHtml } from 'hast-util-from-html';
import { toString as mdastToString } from 'mdast-util-to-string';
import { mdxAnnotations } from 'mdx-annotations';
import { createHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';

function rehypeParseCodeBlocks() {
	return (tree) => {
		visit(tree, 'element', (node, _nodeIndex, parentNode) => {
			if (node.tagName === 'code') {
				parentNode.properties.language = node.properties.className
					? node.properties.className[0].replace(/^language-/, '')
					: 'bash';
			}
		});
	};
}

let highlighter;
let highlighterPromise;

function rehypeShiki() {
	return async (tree) => {
		highlighterPromise ??= createHighlighter({
			themes: ['github-light'],
			langs: [
				'javascript',
				'bash',
				'json',
				'typescript',
				'shell',
				'tsx',
				'jsx',
				'python',
				'php',
				'ruby',
				'go',
				'rust',
				'java',
				'c',
				'cpp',
				'csharp',
				'html',
				'css',
				'sql',
				'yaml',
				'xml',
				'markdown',
				'toml',
				'nginx',
				'dockerfile',
				'ini',
				'powershell',
				'docker',
			],
		});
		highlighter = highlighter ?? (await highlighterPromise);

		visit(tree, 'element', (node) => {
			if (
				node.tagName === 'pre' &&
				node.children[0] &&
				node.children[0].tagName === 'code'
			) {
				const codeNode = node.children[0];
				const textNode = codeNode.children[0];

				if (!textNode || textNode.type !== 'text') return;

				node.properties.code = textNode.value;

				if (node.properties.language === 'mermaid') {
					const encodedCode = Buffer.from(textNode.value).toString('base64');
					node.tagName = 'img';
					node.properties = {
						src: `https://mermaid.ink/img/${encodedCode}`,
						alt: 'Mermaid Diagram',
						className: 'mermaid-diagram',
						style:
							'max-width: 100%; height: auto; margin: 2rem 0; display: block;',
					};
					node.children = [];
					return;
				}

				if (node.properties.language) {
					const html = highlighter.codeToHtml(textNode.value, {
						lang: node.properties.language,
						theme: 'github-light',
					});

					const hast = fromHtml(html, { fragment: true });
					const preNode = hast.children[0];
					if (preNode && preNode.tagName === 'pre') {
						const innerCodeNode = preNode.children[0];
						if (innerCodeNode && innerCodeNode.tagName === 'code') {
							codeNode.children = innerCodeNode.children;
							codeNode.properties = Object.assign(
								{},
								codeNode.properties,
								innerCodeNode.properties,
							);
							node.properties = Object.assign(
								{},
								node.properties,
								preNode.properties,
							);
						}
					}
				}
			}
		});
	};
}

function rehypeSlugify() {
	return (tree) => {
		const slugify = slugifyWithCounter();
		visit(tree, 'element', (node) => {
			if (node.tagName === 'h2' && !node.properties.id) {
				node.properties.id = slugify(mdastToString(node));
			}
		});
	};
}

function rehypeAddMDXExports(getExports) {
	return (tree) => {
		for (const [name, value] of Object.entries(getExports(tree))) {
			const found = tree.children.some(
				(node) =>
					node.type === 'mdxjsEsm' &&
					new RegExp(`export\\s+const\\s+${name}\\s*=`).test(node.value),
			);
			if (found) continue;

			const exportStr = `export const ${name} = ${value}`;

			tree.children.push({
				type: 'mdxjsEsm',
				value: exportStr,
				data: {
					estree: acorn.parse(exportStr, {
						sourceType: 'module',
						ecmaVersion: 'latest',
					}),
				},
			});
		}
	};
}

function getSections(node) {
	const sections = [];
	const children = node.children || [];

	for (const child of children) {
		if (child.type === 'element' && child.tagName === 'h2') {
			sections.push(
				`{ title: ${JSON.stringify(mdastToString(child))}, id: ${JSON.stringify(child.properties.id)} }`,
			);
		} else if (child.children) {
			const subSections = getSections(child);
			sections.push(...subSections);
		}
	}

	return sections;
}

export const rehypePlugins = [
	mdxAnnotations.rehype,
	rehypeParseCodeBlocks,
	rehypeShiki,
	rehypeSlugify,
	[
		rehypeAddMDXExports,
		(tree) => ({
			sections: `[${getSections(tree).join(',')}]`,
		}),
	],
];
