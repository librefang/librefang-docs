import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LibreFang Docs',
  description: 'LibreFang Agent Operating System Documentation',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/librefang' },
      { text: 'GitHub', link: 'https://github.com/librefang/librefang' }
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '快速开始', link: '/librefang' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/librefang/librefang' }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
  }
})
