# 架构概览
## 系统拓扑

```
┌─────────────────────────────────────────────────────┐
│                    Evan (Human)                      │
│      Telegram / LINE / QQ / WeCom / Discord          │
└────────────┬────────────────────┬────────────────────┘
             │                    │
      ┌──────▼──────┐     ┌──────▼──────┐
      │  智多星 (主)  │     │  Gmail Hook │     ┌──────────────┐
      │ claude-opus  │     │   (haiku)   │     │ Vercel 前端  │
      └──────┬──────┘     └──────┬──────┘     │ (像素办公室)  │
             │                    │           └──────▲───────┘
  ┌──────────▼────────────────────▼──────────┐       │
  │           OpenClaw Gateway                │       │ Realtime
  │  LaunchAgent: ai.openclaw.gateway :18789  │       │ Updates
  └──────┬──────────┬──────────┬─────────────┘       │
         │          │          │              ┌──────▼──────┐
  ┌──────▼───┐┌─────▼────┐┌────▼─────┐        │  Supabase   │
  │ Aria(PM) ││ Zeph(Ar) ││ Rex(Dev) │──────►│ (共享大脑)   │
  └──────────┘└──────────┘└──────────┘        └─────────────┘
```

## 核心组件

| 组件 | 说明 |
|------|------|
| **Gateway** | 消息中控负责 WebSocket 通信和工具分发 |
| **Shared Cortex** | 基于 Supabase 的多 Agent 共享记忆与任务看板 |
| **Pixel Office** | 基于 Next.js 的可视化控制面板展示 Agent 实时状态 |
| **Lancedb** | 本地向量数据库用于存储长期记忆片段 |
| **Team Yldm** | 8 个专业 Agent 组成的协作集群，支持 Ship Faster 流水线与圆桌决策 |

  ┌──────▼───────────────────┐ ┌───▼────┐ ┌──▼──────────┐
  │        YLDM TEAM         │ │ Cron   │ │ Node Host   │
  │ Aria(PM) Zeph(架构)      │ │ 49 jobs│ │ Mac mini    │
  │ Rex(后端) Neon(前端)     │ └────────┘ └─────────────┘
  │ Lyra(QA) Nova(UI/UX)    │
  │ Emma(DevOps) + 智多星   │
  └──────────────────────────┘
```

## Ship Faster 产品交付流

```
Evan "想做一个 XXX"
  → 智多星 → Aria（Ship Faster 编排入口）
    → Phase 1: Nova(design-system) ‖ Zeph(foundation + architecture)
    → Phase 2: Neon(features) ‖ Rex(DB/Auth/Stripe)
    → Phase 3: Lyra(quality review) → PASS/BLOCK
    → Phase 4: Emma(deploy) → URL 上线
  → Aria 汇报 → 智多星 → Evan
```

## Discord 团队讨论流

```
智多星/Aria → Discord #yldm-dev → @成员 讨论
  → 每次最多 3 轮 → 结论沉淀为 Artifacts
  → 成员汇报 → 智多星确认 → 转告 Evan
```

## 数据流

### 用户交互流

```
Evan → Telegram/LINE/QQ/WeCom → Gateway → 智多星 → [分派] → Agent → Discord 群
                                              → [执行] → K8s/NAS/OCI
                                              → [汇报] → 智多星 → Evan
```

### 告警自动化流

```
K8s AlertManager ──→ n8n webhook ──→ GitHub Issue + Telegram 通知
Sentry Error     ──→ n8n webhook ──→ GitHub Issue + Telegram 通知
GitHub PR Merge  ──→ n8n webhook ──→ Telegram 通知 + GitHub Issue comment
```

### Gmail 实时处理流

```
Gmail → Google Pub/Sub → Cloudflare Tunnel → gog watch serve → Gateway Hook
```

## 模型配置

| 角色 | 模型 | 用途 |
|------|------|------|
| 智多星 (主) | claude-opus-4-6 | 协调、复杂推理 |
| 团队成员 (7人) | claude-opus-4-6 | 专业任务 |
| Pipeline 子代理 | MiniMax-M2.5-highspeed | bug-fix / feature-dev / security-audit |
| Cron 任务 (51个) | MiniMax-M2.5-highspeed (默认) | 提醒、巡检、报告 |
| Gmail Hook | claude-haiku-4-5 | 邮件分类，节省 95% 成本 |
| 图片生成 | gemini-3-pro-preview | 图片生成/编辑 |
| 模型兜底链 | MiniMax → Gemini → Sonnet | 主路由失败时自动切换 |

## 插件栈

| 插件 | 功能 |
|------|------|
| telegram | Telegram 渠道 |
| line | LINE 渠道 |
| qqbot | QQ 渠道 (@sliverp/qqbot) |
| wecom | 企业微信渠道 (@mocrane/wecom) |
| memory-lancedb | 向量记忆 (OpenAI embedding) |
| google-gemini-cli-auth | Gemini OAuth |
| diagnostics-otel | OpenTelemetry → Tempo |
| device-pair | 设备配对 |
| phone-control | 手机控制 |
| talk-voice | 语音选择 |
| llm-task | 结构化 JSON 任务 |
| lobster | 可恢复工作流引擎 |
