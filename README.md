# YLDM Docs Template

一个基于 Next.js 和 MDX 的现代化文档站点模板专为构建高质量的 API 文档产品文档和技术文档而设计

##  特性

-  **MDX 支持** - 在 Markdown 中使用 React 组件
-  **全文搜索** - 基于 FlexSearch 的快速搜索
-  **现代设计** - 清晰美观的文档界面
-  **响应式** - 完美适配各种设备
-  **深色模式** - 自动主题切换
-  **性能优化** - 静态生成和优化的热更新
-  **自动导航** - 基于文件结构的导航生成
-  **自动链接** - 标题自动生成锚点链接
-  **SEO 优化** - 内置 SEO 最佳实践
-  **代码高亮** - 支持多种编程语言语法高亮

##  项目结构

```bash
src/
├── app/                # App Router 页面
│   ├── page.mdx       # 首页
│   ├── layout.tsx     # 根布局
│   └── [...]/         # 子页面
├── components/         # React 组件
│   ├── Layout.tsx     # 主布局
│   ├── Navigation.tsx # 导航组件
│   ├── Search.tsx     # 搜索组件
│   ├── ErrorBoundary.tsx # 错误边界
│   └── mdx.tsx        # MDX 组件映射
├── mdx/               # MDX 插件配置
│   ├── remark.mjs     # Remark 插件
│   ├── rehype.mjs     # Rehype 插件
│   └── search.mjs     # 搜索配置
├── types/             # TypeScript 类型定义
└── styles/            # 样式文件
```

##  快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看文档站点

### 构建生产版本

```bash
pnpm run build
```

### 启动生产服务器

```bash
pnpm run start
```

##  文档

- [组件说明](./docs/COMPONENTS.md) - 详细的组件使用指南
- [部署指南](../DEPLOYMENT.md) - 各种平台的部署说明
- [最佳实践](../BEST_PRACTICES.md) - 开发最佳实践和建议

##  编写文档

### 创建新页面

1. 在 `src/app` 目录下创建 `page.mdx` 文件
2. 添加页面元数据和内容

```mdx
export const metadata = {
  title: '页面标题',
  description: '页面描述'
}

export const sections = [
  { title: '章节1', id: 'section-1' },
  { title: '章节2', id: 'section-2' },
]

# 页面标题

这是页面内容...

## 章节1 {{ id: 'section-1' }}

章节内容...
```

### 使用组件

在 MDX 中可以直接使用 React 组件

```mdx
import { Button } from '@/components/Button'
import { CodeBlock } from '@/components/CodeBlock'

<Button href="/api/users">查看 API</Button>

<CodeBlock language="javascript">
{`
const response = await fetch('/api/users')
const users = await response.json()
`}
</CodeBlock>
```

### 代码高亮

支持多种语言的语法高亮

```javascript
function greet(name) {
  return `Hello, ${name}!`
}
```

```typescript
interface User {
  id: string
  name: string
  email: string
}
```

##  自定义配置

### 修改主题

编辑 `src/app/providers.tsx`:

```tsx
const theme = {
  colors: {
    primary: 'blue-600',
    secondary: 'gray-600',
  }
}
```

### 搜索配置

编辑 `src/mdx/search.mjs`:

```javascript
const searchOptions = {
  threshold: 0.2,    // 搜索阈值
  limit: 10,         // 结果数量限制
  depth: 3,          // 搜索深度
}
```

### 导航配置

导航会自动基于文件结构生成也可以手动配置

```tsx
const navigation = [
  {
    title: '开始',
    href: '/getting-started',
  },
  {
    title: 'API 参考',
    href: '/api',
    children: [
      { title: '用户', href: '/api/users' },
      { title: '订单', href: '/api/orders' },
    ]
  }
]
```

##  MDX 组件

### 内置组件

- `Heading` - 自动生成锚链接的标题
- `Code` - 代码块组件
- `Tag` - 标签组件
- `Button` - 按钮组件

### 自定义组件

在 `src/components/mdx.tsx` 中添加自定义组件

```tsx
const components = {
  // 自定义标题渲染
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  
  // 自定义代码块
  pre: (props) => <CodeBlock {...props} />,
  
  // 自定义组件
  CustomComponent: (props) => <div {...props} />
}
```

##  搜索功能

### 全局搜索

- 支持 `K` (Mac) 或 `Ctrl+K` (Windows) 快捷键
- 实时搜索结果
- 支持键盘导航

### 搜索索引

搜索索引会自动构建包含

- 页面标题
- 章节标题
- 页面内容
- 代码块内容

##  SEO 优化

### 自动 Meta 标签

每个页面自动生成

- `title` - 页面标题
- `description` - 页面描述
- `og:title` - Open Graph 标题
- `og:description` - Open Graph 描述
- `twitter:card` - Twitter 卡片

### 结构化数据

自动生成文档的结构化数据提升搜索引擎理解

##  部署

### Vercel (推荐)

```bash
# 自动部署
git push origin main
```

### 静态导出

```bash
# 构建静态文件
pnpm run build

# 导出到 out 目录
pnpm run export
```

### Docker

```dockerfile
FROM node:18-alpine
COPY . /app
WORKDIR /app
RUN pnpm install && pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
```

##  性能特性

- **静态生成** - 所有页面预渲染
- **代码分割** - 自动按路由分割
- **图片优化** - 自动优化图片格式和尺寸
- **字体优化** - 本地字体避免网络请求
- **MDX 热更新** - 开发时快速刷新

##  开发工具

### 格式化和检查

```bash
pnpm run lint      # ESLint 检查
pnpm run format    # Prettier 格式化
pnpm run typecheck # TypeScript 检查
```

### 环境变量

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SEARCH_API_KEY=your_search_key
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

##  插件系统

### Remark 插件

处理 Markdown 内容

- `remark-gfm` - GitHub 风格 Markdown
- `remark-smartypants` - 智能标点符号

### Rehype 插件

处理 HTML 输出

- `rehype-slug` - 为标题生成 ID
- `rehype-autolink-headings` - 自动链接标题
- `rehype-highlight` - 代码语法高亮

##  贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/docs-improvement`)
3. 提交更改 (`git commit -m 'Improve documentation'`)
4. 推送到分支 (`git push origin feature/docs-improvement`)
5. 开启 Pull Request

##  许可证

本项目使用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

##  支持

如果遇到问题或需要帮助

1. 查看 [组件文档](./docs/COMPONENTS.md)
2. 查看 [最佳实践](../BEST_PRACTICES.md)
3. 提交 [Issue](../../issues)

##  相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [MDX 文档](https://mdxjs.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [FlexSearch 文档](https://github.com/nextapps-de/flexsearch)
