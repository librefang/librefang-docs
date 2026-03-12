import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LibreFang Docs',
  description: 'LibreFang Agent Operating System Documentation',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/librefang/librefang' }
    ],
    sidebar: [
      {
        text: '入门',
        items: [
          { text: '快速开始', link: '/librefang' },
        ]
      },
      {
        text: '配置',
        items: [
          { text: '配置文件', link: '/configuration' },
          { text: 'LLM 提供商', link: '/providers' },
        ]
      },
      {
        text: '架构',
        items: [
          { text: '系统架构', link: '/architecture' },
          { text: '安全', link: '/security' },
        ]
      },
      {
        text: '集成',
        items: [
          { text: '通道适配器', link: '/channels' },
          { text: 'CLI 参考', link: '/cli' },
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
