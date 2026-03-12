export const getPathPrefix = () => {
	return process.env.NODE_ENV === 'development' ? '/template-docs' : '';
};

export const withPrefix = (path: string) => `${getPathPrefix()}${path}`;

const sharedLocalizedSlugs = [
	'agents',
	'api',
	'architecture',
	'channels',
	'cli',
	'configuration',
	'desktop',
	'development',
	'examples',
	'faq',
	'glossary',
	'hands',
	'memory',
	'migration',
	'production',
	'providers',
	'roadmap',
	'sdk',
	'security',
	'skills',
	'troubleshooting',
	'workflows',
];

const localizedRoutePairs = new Map<string, string>([
	['/', '/zh'],
	['/getting-started', '/zh/librefang'],
	...sharedLocalizedSlugs.map((slug) => [`/${slug}`, `/zh/${slug}`] as const),
]);

const reverseLocalizedRoutePairs = new Map(
	Array.from(
		localizedRoutePairs,
		([enPath, zhPath]) => [zhPath, enPath] as const,
	),
);

export const normalizePathname = (pathname: string | null | undefined) => {
	const pathPrefix = getPathPrefix();
	let normalizedPath = pathname || '/';

	if (pathPrefix && normalizedPath.startsWith(pathPrefix)) {
		normalizedPath = normalizedPath.slice(pathPrefix.length) || '/';
	}

	if (!normalizedPath.startsWith('/')) {
		normalizedPath = `/${normalizedPath}`;
	}

	if (normalizedPath !== '/' && normalizedPath.endsWith('/')) {
		normalizedPath = normalizedPath.slice(0, -1);
	}

	return normalizedPath || '/';
};

export const isZhPath = (pathname: string | null | undefined) =>
	normalizePathname(pathname).startsWith('/zh');

export const getLocalizedHomePath = (pathname: string | null | undefined) =>
	withPrefix(isZhPath(pathname) ? '/zh' : '/');

export const getAlternateLocalePath = (pathname: string | null | undefined) => {
	const normalizedPath = normalizePathname(pathname);

	if (localizedRoutePairs.has(normalizedPath)) {
		return withPrefix(localizedRoutePairs.get(normalizedPath) || '/zh');
	}

	if (reverseLocalizedRoutePairs.has(normalizedPath)) {
		return withPrefix(reverseLocalizedRoutePairs.get(normalizedPath) || '/');
	}

	return withPrefix(isZhPath(normalizedPath) ? '/' : '/zh');
};
