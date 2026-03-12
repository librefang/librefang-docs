# n8n Webhooks

## 核心闭环GitHub 为中心

系统已彻底废弃 Linear所有工作流现在围绕 **GitHub Issues** 运行

1. **告警入库**AlertManager/Sentry 发现异常 -> n8n 自动在 `openclaw-config` 创建 P0/P1 Issue
2. **自动指派**智多星感知 Issue -> 唤醒 `bug-fix_triager` 开始诊断
3. **反馈闭环**PR 合并 -> n8n 自动在 TG 发布部署通知并关闭 Issue

## 工作流列表

| ID | 名称 | Webhook | 功能 |
|----|------|---------|------|
| gMtxo0gZp1klMDZI | AlertManager → GitHub Issues + TG | /webhook/alertmanager-github | K8s 告警自动建 Issue |
| 6cjqTuMab9zJCh72 | Sentry → GitHub Issues + TG | /webhook/sentry-alert-github | 错误分级建 Issue |
| 42CwjbMahHhTNkjo | PR Merge → TG | /webhook/github-pr-merge | 部署通知+关联 |
| 9LjZWXk1bcCWOA5T | GitHub Issues → TG (已禁用) | /webhook/linear-webhook | 状态同步 |
| aM0dEyUuXzUa0vss | Sentry → TG | /webhook/sentry-webhook | 错误通知 |
| ms1NsFDqLGy4e9jU | GitHub Push → Sentry | /webhook/github-push | Release 创建 |
| wJn6059x71ECrBM8 | AlertManager → TG | /webhook/alertmanager | 告警通知 |

## 全链路闭环

```
Alert/Error
    ↓
n8n Webhook
    ↓
┌───────────┐    ┌───────────┐
│  GitHub   │    │ Telegram  │
│  Issue    │    │  通知      │
└─────┬─────┘    └───────────┘
      ↓
  开发修复
      ↓
  PR (含 YLDM-xx)
      ↓
  Merge to main
      ↓
┌───────────┐    ┌───────────┐
│ ArgoCD    │    │ TG 通知 + │
│ 自动部署   │    │ GitHub    │
└───────────┘    │ Comment   │
                 └───────────┘
```

## Sentry 分级规则

| 级别 | 处理方式 |
|------|----------|
| error / fatal | 自动建 GitHub Issue + Telegram 通知 |
| warning / info | 仅 Telegram 通知 |
