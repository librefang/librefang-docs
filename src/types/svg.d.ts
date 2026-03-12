declare module '*.svg' {
	import type { StaticImageData } from 'next/image';
	const content: StaticImageData;
	export default content;
}

declare module '*.svg?url' {
	const content: string;
	export default content;
}

declare module '*.svg?component' {
	import type { FunctionComponent, SVGProps } from 'react';
	const content: FunctionComponent<SVGProps<SVGSVGElement>>;
	export default content;
}
