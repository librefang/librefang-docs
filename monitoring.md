# 监控

## 栈

```
Prometheus → Grafana (Dashboard)
    ↓
AlertManager → n8n → GitHub Issues + Telegram
    
Loki (Logs) → Grafana
Tempo (Traces) ← OpenTelemetry → Grafana
```

## 端点

| 服务 | URL |
|------|-----|
| Grafana | https://grafana.yldm.tech |
| Prometheus | https://prometheus.yldm.tech |
| AlertManager | https://alertmanager.yldm.tech |

## 智能自愈 (AI SRE)

系统集成了基于 LLM 的 **AI SRE 诊断机制**对应 `infra-k8s-sre` 任务

1. **自动感知**通过 Prometheus 接口实时监控集群健康
2. **深度溯源**当告警触发时SRE Agent 自动拉取 **Loki 日志** 和 **Tempo 链路追踪** 数据
3. **根因分析**AI 分析异常模式如 OOM, CrashLoopBackOff 或网络延迟
4. **决策执行**产出修复方案并通过 `kubernetes` 技能尝试自动重启扩容或回滚
| Tempo | https://tempo.yldm.tech |
| OTLP | https://otlp.yldm.tech |

## OpenClaw → Tempo

OpenClaw 通过 `diagnostics-otel` 插件将 traces/metrics/logs 导出到 Tempo可在 Grafana 中查看 agent 执行链路

## 巡检 Cron

| 频率 | 检查项 |
|------|--------|
| 每 30 分钟 | Mac + NAS + K8s + Plex + OCI + Tunnel |
| 每 6 小时 | 13 个网页可用性 |
| 工作日 5 次 | ArgoCD 同步状态 |
| 每日 | K8s 集群日报 |
| 每周六 | 全面安全扫描 |
