# ClawX 优化与自愈

本系统深度集成 ClawX (Claude Code) 协议实现“开发即运维”的闭环

## 核心能力

### 1. 技能进化 (Skill Evolution)
系统通过内置自学习引擎记录每一次工具调用的成败。当发现重复性错误时，智多星自动提取规则写入长期记忆（corrections→memory 闭环），并唤醒 ClawX 分析日志产出修复补丁（Patch）

### 2. 自动化 Patch 应用
所有由 Agent 产生的补丁遵循以下流程：
1. **生成**：智多星分析 `runs/` 日志，产出 `PATCH.md`
2. **审计**：智多星或 Evan 评审补丁逻辑
3. **应用**：调用 `coding-agent` 在沙箱中验证并合入主线

## 开发建议 (For Agents)

- **使用结构化输出**在执行复杂命令时优先使用带有 `--json` 标志的命令方便 ClawX 解析
- **保持 Session 纯净**在大规模重构前使用 `git stash` 保护现场
- **文档快照**在遇到不熟悉的 OpenClaw 报错时立即调用 `tool-openclaw` 检索 `references/docs`

---
*ClawX: Bringing autonomous engineering to Team Yldm.*
