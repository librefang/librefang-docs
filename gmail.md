# Gmail Hook

## 架构

```
Gmail 新邮件
    ↓
Google Pub/Sub (projects/sage-wave-488513-k2/topics/gog-gmail-watch)
    ↓
Push Endpoint: https://gmail-hook.xiaomo.info/gmail-pubsub
    ↓
Cloudflare Tunnel (mac-mini) → localhost:8788
    ↓
gog watch serve (Gateway 内建管理)
    ↓
OpenClaw Gateway hooks/gmail
    ↓
claude-haiku-4-5 分类处理
```

## 邮件分级

| 级别 | 标准 | 处理 |
|------|------|------|
|  紧急 | 同事/老板urgent/ASAP/至急账单到期 | 立即推送 |
|  重要 | GitHub 通知PR review工作相关 | 推送 |
|  普通 | newsletter自动通知 | 跳过 |
|  黑名单 | 24+ 已屏蔽发件人 | 直接忽略 |

## 自动处理 (Automation)

- **消费邮件自动记账**实时接收消费确认SMBC, PayPay, Amazon JP 等由 AI 提取金额并自动存入 `expenses.json`对应任务`daily-expense-tracker`
- **物流状态同步**识别到 Yamato, Sagawa 或 JP Post 的发货邮件后自动调用 `track_package.py` 开启追踪
- **紧急通知推送**识别到银行风险提示或服务器停机邮件立即通过 TG P0 告警通道推送
