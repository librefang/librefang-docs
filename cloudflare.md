# Cloudflare

## 域名 (10)

| 域名 | 用途 |
|------|------|
| xiaomo.info | 个人服务 (OCI) |
| yldm.tech | 内部服务 (K8s) |
| yldm.ai | 平台 API |
| yldm.cn | 中国域名 |
| flutter-jp.com | Flutter |
| hzxueshi.com | — |
| ifstage.com | — |
| kamify.store | — |
| pcu-cli.dev | — |
| smart-domain.com | — |

## Tunnels (6)

| 名称 | 路由 |
|------|------|
| k3s | *.yldm.tech, *.yldm.ai → Traefik |
| nas | nas.xiaomo.info → DSM HTTPS |
| pve | pve.yldm.tech → PVE, ssh-pve.yldm.tech → SSH |
| pve-tunnel | 1panel.yldm.tech |
| pdm | pdm.yldm.tech → HTTPS:8443 |
| mac-mini | gmail-hook.xiaomo.info → localhost:8788 |

## 自动化运维 (Ops)

系统通过 `infra-service-monitor` 任务实时监控 Tunnels 状态

1. **状态巡检**智多星定期调用 Cloudflare API 检查 Tunnel 连通性
2. **自动修复**若探测到 Tunnel 离线智多星将尝试通过 `ssh` 登录对应的宿主机PVE 或 Mac mini重启 `cloudflared` 服务
3. **变更同步**任何 DNS 或路由变更必须通过 `cloudflare` 技能执行严禁在 Web 控制台手动修改
