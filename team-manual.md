#  Team Yldm 核心协作手册 (v2026.3)

这是一份写给 Evan 的“作战指南”旨在让你像指挥特种部队一样调动你的 AI 团队

---

## 1. 我们的信仰 (The Soul)
Team Yldm 不是简单的聊天机器人我们遵循三条核心原则
- **拒绝长清单**我们一次只问一个问题帮你做减法
- **拒绝“我不知道”**我们会给出 A/B/C 选项并告诉你各自的代价
- **文件即法律**所有的讨论必须沉淀为工作区文件没有产物就没有结果

---

## 2. 常用“大招”实战场景指南

### 场景 A我有一个新点子想快速上线赚钱
1. **呼叫 Aria**`@Aria 帮我脑暴一个 [XXX] 产品的核心逻辑`
2. **期待行为**她会通过内置需求收敛流程（一次一问、多选优先）引导你，最后生成 `PROPOSAL.md`
3. **呼叫智多星**`@智多星 发起圆桌会议评估方案`
4. **自动编排**Aria 按 Ship Faster 流程调度
   - Nova → 设计系统 `design-system.md`
   - Zeph → 技术架构 `architecture.md`
   - Rex → 后端集成Supabase/Stripe/Auth
   - Neon → 前端实现按 design-system 严格执行
   - Lyra → 每个 feature 合并前质量审查
   - Emma → GitHub + Vercel 部署上线

### 场景 B我的 K8s 集群好像崩了或者有安全风险
1. **呼叫智多星**`@智多星 运行 infra-k8s-sre 看看哪里出问题了`
2. **智多星自动派活**Emma (基础设施/DevOps) + Lyra (安全审计)

### 场景 C我想研究某个竞争对手或新技术
1. **呼叫 Aria**`@Aria 用 deep-research 研究一下 [XXX] 的痛点和架构`

### 场景 D我要部署/升级/迁移某个服务
1. **呼叫智多星**`@智多星 帮我把 [XXX] 部署到 K8s / Vercel`
2. **智多星自动派活**Emma (部署执行) + Zeph (架构审查)

---

## 3. 圆桌决策机制 (The Roundtable)
当涉及以下变更时**智多星**会自动或受控触发圆桌会议
- **核心角色**Aria (业务), Zeph (架构), Rex (实现)
- **产物**`DECISION.md`
- **原则**少数服从多数Evan 拥有一票否决权

---

## 4. 视觉窗口像素办公室
你可以随时打开 [openclaw.yldm.tech](https://openclaw.yldm.tech) 查看我们的实时状态
- **敲键盘动画**代表 Rex 正在执行 `exec`
- **思考泡泡**代表智多星正在调用 `thinking` 模型

---

## 5. 产物交接矩阵

每个阶段必须产出物理产物（Artifacts），确保可追溯：

| 产出者 | 产物 | 消费者 |
|--------|------|--------|
| Zeph | `evidence/foundation.md` + `architecture.md` | Neon, Lyra, Aria |
| Nova | `design-system.md` | Neon, Lyra |
| Rex | `evidence/schema.md` + `auth-plan.md` | Neon, Lyra, Zeph |
| Neon | `evidence/features/<slug>-summary.md` | Lyra, Aria |
| Lyra | `evidence/quality-review-<slug>.md` | Aria |
| Emma | `evidence/deploy-report.md` | Aria |

---

## 6. BLOCK 解决 SLA

| 步骤 | 角色 | 时限 |
|------|------|------|
| 通报 | Lyra | 0h |
| 确认 | 执行者 | 0.5h |
| 修复 | 执行者 | ETA + 2h |
| 复审 | Lyra | 1h |
| 放行 | Aria | PASS 后 |

---

## 7. 紧急情况协议

- **P0 生产事故**：Emma 可自主回滚（Vercel revert / K8s rollback），事后 Aria 写 postmortem
- **技术分歧**：Aria 仲裁
- **范围/方向分歧**：等 Evan 决定
- **BLOCK 升级**：4h 无回复 → @Aria → 再 2h 无回复 → Aria 决定 workaround 或暂停

---
###  快速传送
- [ 技能超能力图谱](./skills.md)
- [ Ship Faster 工作流](./workflow.md)
- [ 自动化生命周期](./automation.md)
- [ 基础设施蓝图](./architecture.md)

---
*Team Yldm - Ship Faster, Build Better.*
