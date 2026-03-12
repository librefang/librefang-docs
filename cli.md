# OpenClaw CLI 速查

## 常用命令

| 命令 | 说明 |
|------|------|
| `openclaw status` | 频道健康+最近会话 |
| `openclaw health` | Gateway 健康检查 |
| `openclaw doctor` | 全面检查+修复 |
| `openclaw logs` | 实时 tail Gateway 日志 |
| `openclaw gateway restart` | 重启 Gateway |
| `openclaw gateway usage-cost` | API 成本统计7天 |

## 会话管理

| 命令 | 说明 |
|------|------|
| `openclaw sessions list` | 会话列表 |
| `openclaw agent --message <msg>` | 单次 agent 调用 |

## Cron

| 命令 | 说明 |
|------|------|
| `openclaw cron list` | 列出所有任务 |
| `openclaw cron runs` | 查看执行记录 |
| `openclaw cron edit` | 编辑任务 |

## 消息

| 命令 | 说明 |
|------|------|
| `openclaw message send --channel tg --target <id> --message <msg>` | 发消息 |
| `openclaw message broadcast --message <msg>` | 群发 |

## 节点

| 命令 | 说明 |
|------|------|
| `openclaw nodes status` | 节点状态 |
| `openclaw nodes run --node <name> --raw "<cmd>"` | 远程命令 |

## 记忆

| 命令 | 说明 |
|------|------|
| `openclaw ltm stats` | 向量记忆统计 |
| `openclaw ltm search <query>` | 搜索记忆 |
| `openclaw memory search` | 文件记忆索引 |

## 其他

| 命令 | 说明 |
|------|------|
| `openclaw config get/set <path>` | 配置管理 |
| `openclaw directory self --channel tg` | 联系人 |
| `openclaw security audit --deep` | 安全审计 |
| `openclaw update` | 更新 CLI |
