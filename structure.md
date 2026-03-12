# 目录结构

## 完整树形

```
~/.openclaw/
├── openclaw.json              #  主配置 (模型渠道插件)
├── AGENTS.md                  #  主 agent 指令与团队规则
├── exec-approvals.json        #  免审批命令白名单
│
├── agents/                    #  Agent 私有配置（系统提示 + 会话缓存）
│   ├── main/                  #    智多星
│   │   ├── agent/
│   │   │   └── AGENTS.md      #      系统提示（最高优先级指令）
│   │   └── sessions/          #      会话缓存
│   ├── aria/                  #    Aria (PM)
│   │   ├── agent/
│   │   │   └── AGENTS.md      #      含 Ship Faster 编排 + 协作规则
│   │   └── sessions/
│   ├── zeph/ rex/ neon/       #    架构 / 后端 / 前端
│   ├── lyra/ nova/ emma/      #    QA / UI-UX / DevOps
│   └── ...                    #    每个 agent 同构: agent/AGENTS.md + sessions/
│
├── cron/                      #  自动化任务
│   └── jobs.json              #    49+ 定时任务配置
│
├── skills/                    #  已安装 Skills (57+ 活跃)
│   ├── deep-research/         #    深度研究 (Pro)
│   ├── brave-api-search/      #    搜索
│   ├── ...                    #    其他工具类能力模块
│
├── templates/                 #  36 个现成 SaaS 业务模版 (001-036)
│
├── self-improving/            #  自学习记忆系统 (HOT/WARM/COLD 三层)
│
├── devices/                   #  配对设备状态
│
├── workspace-aria/            #  Agent 工作空间上下文（7 个）
│   ├── AGENTS.md              #    角色定义 + Ship Faster 工作流
│   ├── SOUL.md                #    人格准则
│   ├── TOOLS.md               #    环境备忘
│   └── references/            #    详细参考材料（Lyra 32 文件、Nova 31 文件等）
├── workspace-{zeph,rex,...}/  #    其他 6 个 agent 同构
│
└── workspace/                 #  主助手核心工作空间
    ├── HANDBOOK.md            #  Team Yldm 内部手册
    ├── SOUL.md                # 人格与行为准则
    ├── IDENTITY.md            # 身份定义
    ├── USER.md                # 用户画像
    ├── MEMORY.md              # 长期记忆
    │
    ├── data/                  #  运行时数据
    │   ├── supabase/          #    SaaS 全量数据库架构 (SQL)
    │   ├── expenses.json      #    支出记录
    │   └── ...
    │
    ├── scripts/               #  极客脚本库
    │   ├── ops/               #    安全审计、备份、巡检
    │   ├── autoupdate/        #    引擎自动升级与文档快照
    │   └── ...
    │
    └── skills/                # 用户自定义本地 Skills
```

## 被 .gitignore 排除的目录

| 目录 | 原因 |
|------|------|
| `logs/` | 运行时详细日志 |
| `memory/` | LanceDB 向量索引数据 |
| `sessions/` | 原始会话上下文文件 |
| `identity/` | 敏感密钥与身份信息 |
| `credentials/`| 平台登录凭据 |
| `.env` | 环境变量敏感配置 |
| `browser/` | 浏览器持久化数据 |
