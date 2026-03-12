# 自动化脚本

## workspace/scripts/

| 脚本 | 用途 |
|------|------|
| `grafana.py` | Grafana API 查询绕过 Cloudflare Access |
| `linear.py` | Linear API (已废弃迁移到 GitHub Issues) |
| `n8n.py` | n8n API 操作 |
| `track_package.py` | 快递追踪/佐川/日本郵便 |
| `auto_expense.py` | 自动记账 |
| `health_report.py` | 健康报告 |
| `tmux_setup.sh` | Tmux 会话初始化 |
| `openclaw_update.sh` | OpenClaw 更新 |
| `openclaw_rollback.sh` | OpenClaw 回滚 |
| `valorant_coach.py` | Valorant 数据分析 |

## 极客运维脚本

位于 `workspace/scripts/ops/` 和 `autoupdate/`

| 脚本 | 用途 | 执行者 |
|------|------|------|
| `security_audit.sh` | 自动扫描 API 密钥泄露与环境合规性 | 智多星 |
| `backup_state.sh` | 全量备份 openclaw.json 及运行时状态 | 智多星 |
| `healthcheck.sh` | 巡检 Gateway 与所有 Agent 通信状态 | 智多星 |
| `openclaw_autoupdate.sh`| 自动检测并安全升级 OpenClaw 引擎 | 智多星 |
| `docs_snapshot_autoupdate.sh` | 自动同步 OpenClaw 技术文档快照 | 智多星 |

## Tmux Sessions

| Session | Pane | 用途 |
|---------|------|------|
| monitor | 0.0 | 异常 Pod + Warning Events |
| monitor | 0.1 | ArgoCD + Node 资源 |
| monitor | 0.2 | 临时日志 |
| worker | 0.0 | Coding agent |
| ops | 0.0 | SSH NAS/运维 |
| ops | 0.1 | Port-forward/DB |
| n8n-logs | 0.0 | n8n webhook 日志 |
