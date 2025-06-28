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
├── app.controller.ts           # 应用主控制器
├── app.controller.spec.ts      # 主控制器测试
├── app.module.ts               # 根模块
├── app.service.ts              # 应用主服务
├── main.ts                     # 应用入口
│
├── auth/                       # 认证与授权模块
│   ├── controllers/            # 认证相关控制器
│   ├── dto/                    # 认证相关数据传输对象
│   ├── guards/                 # 认证与角色守卫
│   ├── services/               # 认证服务
│   └── constants/              # 认证常量
│
├── common/                     # 公共模块
│   ├── constants/              # 公共常量
│   ├── decorators/             # 公共装饰器
│   ├── enums/                  # 枚举类型
│   ├── filters/                # 全局异常过滤器
│   ├── intercepters/           # 全局拦截器
│   └── model/                  # 公共模型
│
├── square/                     # 实时票数与广场相关模块
│   ├── controllers/            # 广场相关控制器
│   ├── services/               # 广场服务
│   └── square.module.ts        # 广场模块
│
├── users/                      # 用户管理模块
│   ├── controllers/            # 用户相关控制器
│   ├── dto/                    # 用户相关数据传输对象
│   ├── services/               # 用户服务
│   └── users.module.ts         # 用户模块
│
├── vote/                       # 投票操作模块
│   ├── controllers/            # 投票相关控制器
│   ├── dto/                    # 投票相关数据传输对象
│   ├── services/               # 投票服务
│   └── vote.module.ts          # 投票模块
│
├── vote-mgmt/                  # 投票管理（主题/候选人/状态）模块
│   ├── controllers/            # 投票管理相关控制器
│   ├── dto/                    # 投票管理相关数据传输对象
│   ├── services/               # 投票管理服务
│   └── vote-mgmt.module.ts     # 投票管理模块

# 根目录其他主要文件
├── Dockerfile                  # Docker 构建文件
├── eslint.config.mjs           # ESLint 配置
├── nest-cli.json               # Nest CLI 配置
├── package.json                # 项目依赖与脚本
├── README.md                   # 项目说明文档
├── tsconfig.build.json         # TypeScript 构建配置
├── tsconfig.json               # TypeScript 配置
└── LICENSE                     # 许可证
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

## Docker 部署

### 构建镜像

在项目根目录下执行：

```bash
docker build -t nest-vote .
```

### 运行容器

```bash
docker run -d -p 3000:3000 --name nest-vote nest-vote
```

容器启动后，可通过 `http://localhost:3000` 访问服务，`http://localhost:3000/swagger` 查看接口文档。

### 常用命令

- 查看日志：
  ```bash
  docker logs -f nest-vote
  ```
- 停止并移除容器：
  ```bash
  docker stop nest-vote && docker rm nest-vote
  ```

> 如需修改端口或环境变量，可在 `docker run` 时通过 `-e` 或 `-p` 参数自定义。

## API 文档

项目启动后，访问 `/swagger` 查看 Swagger 文档， 文档中有测试的样例数据，可直接调用接口。

## 测试流程说明

以下为推荐的功能测试步骤，便于快速验证系统主要业务流程。可使用 Postman、curl 或 Swagger UI 进行接口调用。

1. **注册选民**
   - `POST /users/register`
   - Body 示例：
     ```json
     { 
      "name": "Hans", 
      "ssn": "123456789", 
      "roles": ["admin","user"] 
     }
     ```

2. **选民登录获取 Token**
   - `POST /auth/login`
   - Body 示例：
     ```json
     { "name": "Hans", "ssn": "123456789" }
     ```
   - 返回：`token`，后续接口需携带 `Authorization: Bearer <token>`

3. **管理员登录获取 Token**
   - `POST /auth/login`
   - Body 示例：
     ```json
     { "name": "admin", "ssn": "admin-ssn" }
     ```

4. **管理员添加选举信息**
   - `POST /vote-mgmt/vote-topic`
   - Header：`Authorization: Bearer <admin_token>`
   - Body 示例：
     ```json
     {
          "id": "1751096939952",
          "title": "第50届美国总统选举",
          "candidateList": []
     }
     ```

4. **管理员添加候选人**
   - `POST /vote-mgmt/vote-topic-candidate`
   - Header：`Authorization: Bearer <admin_token>`
   - Body 示例：
     ```json
     {
        "VoteCandidateList": [
            {
                "voteTopicId": "1751096939952",
                "ssn": "123456789",
                "name": "zzk"
            },
            {
                "voteTopicId": "1751096939952",
                "ssn": "1234567892",
                "name": "zzk2"
            }
        ]
      }
     ```

5. **管理员开启投票**
   - `PUT /vote-mgmt/vote-topic-status`
   - Header：`Authorization: Bearer <admin_token>`
   - Body 示例：
     ```json
     { "voteTopicId": "1751096939952", "status": "1"}
     ```

6. **选民投票**
   - `POST /vote`
   - Header：`Authorization: Bearer <voter_token>`
   - Body 示例：
     ```json
     {
       "voteTopicId": "1751096939952",
       "candidate": {
         "voteTopicId": "1751096939952",
         "ssn": "987654321",
         "name": "候选人A"
       }
     }
     ```

7. **查询实时票数**
   - `GET /square/real-time-votes/{voteTopicId}`
   - 示例：`GET /square/real-time-votes/1751096939952`

8. **管理员结束投票**
   - `POST /vote-mgmt/vote-topic-status`
   - Header：`Authorization: Bearer <admin_token>`
   - Body 示例：
     ```json
     { "voteTopicId": "1751096939952", "status": "2"}
     ```

9. **管理员查看最终选举结果**
   - `GET /vote-mgmt/vote-topic/{voteTopicId}`
   - Header：`Authorization: Bearer <admin_token>`
   - 示例：`GET /vote-mgmt/vote-topic/1751096939952`

---

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




