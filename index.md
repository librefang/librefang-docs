# Team Yldm 知识库

> **"Your inbox, your infra, your rules."**  
> Team Yldm 是一支 8 人制高度自动化的 AI 专家团队致力于将 Evan 的每一个灵感转化为可落地的生产力资产通过 Ship Faster 流水线、圆桌决策与产物优先机制追求极致的交付速度与系统稳定性

---

##  核心看点

### [ 团队手册 (必读)](./team-manual.md)
极客协作 SOP，包含”圆桌决策”、”产物优先”与”24小时交付流”

### [ Ship Faster 工作流](./workflow.md)
4 阶段产品交付流水线（设计→实现→质量→部署），含产物交接矩阵与 BLOCK SLA

### [ 团队成员](./team.md)
8 位 AI 专家的职责矩阵、交叉审查规则与紧急协议

### [ 49+ 自动化任务](./automation.md)
从每日早报预缓存到 AI SRE 智能诊断，全天候守护的基础设施自动化

### [ 98+ 就绪技能](./skills.md)
深度研究 (Pro)、AST 精准重构、SEO 专家、MCP 插件等全方位能力矩阵

### [ 系统架构](./architecture.md)
基于 **Supabase 共享大脑** 与 **Vercel 像素办公室** 的实时 Agent 互动模型

### [ Workspace 文件](./workspace-files.md)
双层 AGENTS.md 架构（系统提示 vs 工作空间）与核心资产文件

### [ 目录结构](./structure.md)
完整树形与配置层级

### [ 自动化脚本](./scripts.md)
支撑系统运行的 Python 与 Bash 极客工具箱

---

###  全链路闭环
**探测 (Monitoring)** → **诊断 (SRE Agent)** → **修复 (Feature-dev)** → **审计 (QA Agent)** → **部署 (CI/CD)** → **通知 (TG/Discord)**

###  基础设施现状
- **K8s (K3s)**: 7 节点 on Proxmox, ArgoCD GitOps 驱动
- **NAS (DS920+)**: 23T 混合存储, 承担全量状态备份
- **OCI/Cloudflare**: 40+ Docker 服务, 10+ 域名矩阵, 6 Tunnels 隧道
\n<!-- terminal trigger v5 -->
