import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OpenClaw Config',
  description: 'YLDM TEAM 文档',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'GitHub', link: 'https://github.com/yldm-tech/openclaw-config' }
    ],
    sidebar: [
      {
        text: '概览',
        items: [
          { text: '简介', link: '/' },
          { text: '架构', link: '/architecture' },
          { text: '目录结构', link: '/structure' },
        ]
      },
      {
        text: 'YLDM TEAM',
        items: [
          { text: '团队成员', link: '/team' },
          { text: '协作流程', link: '/workflow' },
        ]
      },
      {
        text: '自动化',
        items: [
          { text: 'Cron 任务', link: '/automation' },
          { text: 'n8n Webhooks', link: '/n8n' },
          { text: 'Gmail Hook', link: '/gmail' },
        ]
      },
      {
        text: '基础设施',
        items: [
          { text: '总览', link: '/infrastructure' },
          { text: 'K8s 集群', link: '/k8s' },
          { text: 'NAS', link: '/nas' },
          { text: 'Cloudflare', link: '/cloudflare' },
          { text: '监控', link: '/monitoring' },
        ]
      },
      {
        text: 'Workspace',
        items: [
          { text: '人格文件', link: '/workspace-files' },
          { text: 'Skills', link: '/skills' },
          { text: '脚本', link: '/scripts' },
        ]
      },
      {
        text: '运维',
        items: [
          { text: '配置变更规则', link: '/git-rules' },
          { text: 'CLI 速查', link: '/cli' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yldm-tech/openclaw-config' }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
  }
})
