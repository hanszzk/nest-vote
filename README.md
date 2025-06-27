# 简易美国总统选举模拟系统

## 项目概述

本项目是一个基于 NestJS + TypeScript 的简易美国总统选举模拟系统，实现了候选⼈管理、选⺠注册与验证、投票操作、实时票数统计和选举结果公布等功能。

## 功能需求

### 管理员功能
- 添加候选⼈
- 启动投票
- 截⽌投票
- 查看最终选举结果（只可在投票结束后查看）

### 选民功能
- 注册并验证⾝份（简化为姓名 + SSN）
- 查询⾃⼰的⾝份信息及投票状态
- 提交投票（每⼈仅能投票⼀次）

### 公共功能
- 查询实时票数（仅在投票进�中可⽤）

## 技术栈

- **框架**: NestJS
- **语言**: TypeScript
- **架构**: 模块化架构
- **关键技术**:
  - DTO 和 Pipe 进行参数校验
  - Guards 实现⾓⾊权限控制（管理员/普通⽤户）
  - 投票状态控制（未开始/进�中/已结束）
  - 全局异常过滤器和⽇志拦截器
  - 实时统计票数（使用内存缓存）

## 项目结构

```
src/
├── auth/                    # 认证模块
├── candidate/              # 候选人管理模块
├── common/                 # 公共模块
│   ├── decorators/         # 装饰器
│   ├── filters/            # 异常过滤器
│   ├── guards/             # 守卫
│   ├── interceptors/       # 拦截器
│   └── pipes/             # 管道
├── config/                 # 配置模块
├── election/               # 选举控制模块
├── user/                   # 用户管理模块
├── vote/                   # 投票模块
├── app.module.ts           # 根模块
└── main.ts                 # 应用入口
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行项目

开发模式：

```bash
npm run start:dev
```

生产模式：

```bash
npm run build
npm run start:prod
```

### 测试

```bash
npm run test
```

## API 文档

项目启动后，访问 `/api` 查看 Swagger 文档。

## 核心功能实现说明

### 1. 状态控制

选举状态通过 `ElectionService` 管理，包含三种状态：
- `NOT_STARTED`: 未开始
- `IN_PROGRESS`: 进行中
- `FINISHED`: 已结束

### 2. 权限控制

使用 `@Roles()` 装饰器和 `RolesGuard` 实现基于角色的访问控制：
- `ADMIN`: 管理员
- `VOTER`: 选民

### 3. 投票限制

通过 `VoteService` 确保：
- 只有验证后的选民可以投票
- 每个选民只能投票一次
- 只能在投票进行阶段投票

### 4. 实时统计

使用内存缓存实现实时票数统计，通过 `CandidateService` 提供实时数据。




