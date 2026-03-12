# 配置变更规则

## 规则

`~/.openclaw` 目录已纳入 git 版本管理远程仓库github.com/houko/openclaw-config

修改以下文件后**必须执行 git commit + push**

- `openclaw.json` — 主配置
- `AGENTS.md``SOUL.md``TOOLS.md` 等 workspace 文件
- `cron/jobs.json` — 定时任务
- `skills/` 下的脚本或配置
- `exec-approvals.json` — 命令白名单
- 任何其他被 git 跟踪的文件

## 极客交付准则

本仓库遵循 **“产物第一 (Artifacts First)”** 的协作逻辑

1. **中间产物必提交**任务执行过程中的 `PROPOSAL.md` (提案)`DECISION.md` (决策) 和架构草图必须存入 Git作为系统的“运行日志”
2. **原子化提交**每一次重大的模型配置变更如主模型切换必须独立提交
3. **自愈记录**由智多星自学习引擎产生的技能优化建议（Patches），需经过评审后合并

## 操作

```bash
# 提交任务产物与配置变更
cd ~/.openclaw && git add -A && git commit -m "feat: ship [project-name] with proposal and architecture" && git push
```

## 注意事项

- workspace 作为子目录统一管理不是独立 repo
- `.gitignore` 排除了敏感信息.env, credentials/, identity/和运行时数据logs/, sessions/, memory/
- 提交消息用中文或英文均可简洁说明改动即可
