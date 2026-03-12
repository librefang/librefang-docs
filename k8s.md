# K8s 集群

## 基本信息

| 项目 | 值 |
|------|------|
| 发行版 | K3s v1.33.5 |
| 宿主 | Proxmox VE |
| API | https://192.168.88.99:6443 |
| Context | k3s-pve |
| GitOps | ArgoCD + Flux |
| Ingress | Traefik @ 192.168.88.221 (MetalLB) |

## 节点

| 角色 | IP 范围 | 数量 |
|------|---------|------|
| Master | 192.168.88.101-103 | 3 |
| Worker | 192.168.88.111-114 | 4 |

## 服务栈

### 监控
Prometheus + Grafana + Loki + Tempo + AlertManager

### 安全
Vault + Kyverno + Cert-Manager + Dex(SSO) + External-Secrets

### 存储
NFS Provisioner + MinIO + Velero(备份)

### 数据库
PostgreSQL, MongoDB, Redis, RabbitMQ, NATS, MeiliSearch, Consul

### 应用

| Namespace | 应用 |
|-----------|------|
| app | aidict, creativestore, kubepocket, magicbox, myetc |
| platform | analytics, auth, commerce, engagement, gateway, management, media, notification, scheduler, social, user |
| game | boardserver, cardserver, pvpserver, rpgserver |

### Ingress 列表

| 服务 | 域名 |
|------|------|
| Grafana | grafana.yldm.tech |
| ArgoCD | argocd.yldm.tech |
| Prometheus | prometheus.yldm.tech |
| Vault | vault.yldm.tech |
| Consul | consul.yldm.tech |
| MeiliSearch | meilisearch.yldm.tech |
| MinIO | minio.yldm.tech |
| Argo Workflows | argo-workflows.yldm.tech |
| Tempo | tempo.yldm.tech |
| Dex | dex.yldm.tech |
| Platform API | api.yldm.ai |

## 极速交付联动 (Ship Faster)

当通过 Ship Faster 流水线交付新功能时

1. **自动推送**Agent 会将编译好的镜像或修改后的 Manifest 推送至 `yldm-tech/k8s-config`
2. **自动同步**ArgoCD 感知到 Git 变更在 3 分钟内自动将应用部署到 K3s 集群
3. **监控闭环**智多星将实时反馈 ArgoCD 的同步结果并链接至 Grafana 查看性能指标

## 变更规则

**禁止直接 `kubectl patch/apply` 改 K8s 资源**

必须改 `yldm-tech/k8s-config` 仓库 → PR → merge → ArgoCD 自动同步

唯一例外紧急修复可先 kubectl 应急但必须同时提 PR 同步 Git 源
