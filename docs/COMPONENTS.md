# 组件文档 - Template Docs

本文档介绍 template-docs 中的组件系统和MDX功能

##  核心组件

### Layout

主布局组件提供文档站点的整体结构

```tsx
import { Layout } from '@/components/Layout'

<Layout allSections={allSections}>
  {children}
</Layout>
```

**Props:**

- `allSections`: Record<string, Section[]> - 所有页面的章节信息
- `children`: React.ReactNode

### Navigation

侧边栏导航组件自动生成基于文件结构的导航

```tsx
import { Navigation } from '@/components/Navigation'

<Navigation allSections={allSections} />
```

### Search

全局搜索组件支持 K 快捷键

```tsx
import { Search } from '@/components/Search'

<Search />
```

**功能:**

- FlexSearch 驱动的全文搜索
- 键盘导航支持
- 实时搜索结果

### Header

顶部导航栏组件

```tsx
import { Header } from '@/components/Header'

<Header navigation={navigation} />
```

##  内容组件

### Prose

Markdown 内容的样式容器

```tsx
import { Prose } from '@/components/Prose'

<Prose>
  <MDXContent />
</Prose>
```

### Heading

自动生成锚链接的标题组件

```tsx
import { Heading } from '@/components/Heading'

<Heading level={2} id="section-id">
  章节标题
</Heading>
```

### Code

代码展示组件支持语法高亮

```tsx
import { Code } from '@/components/Code'

<Code language="typescript">
  {`const example = "Hello World"`}
</Code>
```

### Tag

标签组件用于标记内容类型

```tsx
import { Tag } from '@/components/Tag'

<Tag variant="small">GET</Tag>
<Tag variant="medium">POST</Tag>
```

##  实用组件

### Button

按钮组件支持多种样式

```tsx
import { Button } from '@/components/Button'

<Button href="/docs/api">
  查看API文档
</Button>
```

### GridPattern

背景装饰网格图案

```tsx
import { GridPattern } from '@/components/GridPattern'

<GridPattern className="absolute inset-0" />
```

### HeroPattern

英雄区域背景图案

```tsx
import { HeroPattern } from '@/components/HeroPattern'

<HeroPattern />
```

##  响应式组件

### MobileNavigation

移动端导航组件

```tsx
import { MobileNavigation } from '@/components/MobileNavigation'

<MobileNavigation navigation={navigation} />
```

### ThemeToggle

主题切换组件明暗模式

```tsx
import { ThemeToggle } from '@/components/ThemeToggle'

<ThemeToggle />
```

##  页面组件

### Libraries

SDK和库展示组件

```tsx
import { Libraries } from '@/components/Libraries'

<Libraries />
```

### Resources

资源链接组件

```tsx
import { Resources } from '@/components/Resources'

<Resources />
```

### Guides

指南组件

```tsx
import { Guides } from '@/components/Guides'

<Guides />
```

##  MDX 特性

### 自定义MDX组件

在 `src/components/mdx.tsx` 中配置MDX组件映射

```tsx
const mdxComponents = {
  h1: (props: any) => <Heading level={1} {...props} />,
  h2: (props: any) => <Heading level={2} {...props} />,
  pre: (props: any) => <Code {...props} />,
  // 更多自定义组件...
}
```

### 内置MDX功能

1. **自动目录生成**: 基于标题自动生成页面目录
2. **代码高亮**: 自动语法高亮
3. **锚链接**: 标题自动生成可链接的锚点
4. **搜索索引**: 内容自动加入搜索索引

### 页面元数据

每个MDX页面可以导出元数据

```mdx
export const sections = [
  { title: '介绍', id: 'introduction' },
  { title: '安装', id: 'installation' },
]

# 页面标题

页面内容...
```

##  自定义指南

### 1. 添加新的MDX页面

1. 在 `src/app` 目录下创建 `page.mdx` 文件
2. 添加必要的元数据导出
3. 编写MDX内容
4. 页面会自动出现在导航中

### 2. 自定义主题

编辑 `src/app/providers.tsx` 中的主题配置

```tsx
const themes = {
  light: {
    primary: 'blue',
    background: 'white',
  },
  dark: {
    primary: 'blue',
    background: 'zinc-900',
  }
}
```

### 3. 修改搜索配置

编辑 `src/mdx/search.mjs` 来调整搜索参数

```js
const searchOptions = {
  threshold: 0.2,    // 搜索阈值
  limit: 10,         // 结果限制
  depth: 3,          // 搜索深度
}
```

### 4. 自定义代码高亮

在 `src/mdx/rehype.mjs` 中配置代码高亮

```js
import { rehypeShiki } from '@shikijs/rehype'

const rehypePlugins = [
  [rehypeShiki, {
    theme: 'github-dark',
    langs: ['javascript', 'typescript', 'jsx', 'tsx']
  }]
]
```

### 5. 添加新的图标

在 `src/components/icons/` 目录下添加新的SVG图标组件

```tsx
export function NewIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg {...props}>
      <path d="..." />
    </svg>
  )
}
```

##  插件系统

### Remark 插件

处理Markdown内容的插件配置在 `src/mdx/remark.mjs`

```js
const remarkPlugins = [
  remarkGfm,         // GitHub风格Markdown
  remarkMdxImages,   // 图片处理
]
```

### Rehype 插件

处理HTML的插件配置在 `src/mdx/rehype.mjs`

```js
const rehypePlugins = [
  rehypeSlug,        // 标题ID生成
  rehypeAutolinkHeadings, // 自动链接
]
```

### Recma 插件

处理JavaScript的插件配置在 `src/mdx/recma.mjs`

```js
const recmaPlugins = [
  recmaNextjsStaticProps, // Next.js静态属性
]
```

##  布局系统

### 响应式布局

- 桌面端侧边栏 + 主内容 + 目录
- 平板端可收缩侧边栏 + 主内容
- 移动端全屏内容 + 抽屉式导航

### 网格系统

使用CSS Grid进行布局

```css
.layout {
  display: grid;
  grid-template-columns: 240px 1fr 240px;
  gap: 2rem;
}
```

##  性能优化

1. **静态生成**: 所有页面预渲染为静态HTML
2. **代码分割**: 自动代码分割和懒加载
3. **图片优化**: Next.js Image组件自动优化
4. **字体优化**: 本地字体文件避免网络请求

##  SEO优化

1. **元数据**: 每个页面自动生成SEO元数据
2. **结构化数据**: 文档结构化数据标记
3. **性能指标**: 优化Core Web Vitals
4. **无障碍**: 符合WCAG 2.1标准
