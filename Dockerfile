# 使用官方 Node.js v22.14.0 镜像作为构建阶段
FROM node:22.14.0-alpine3.19 AS builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制依赖文件并安装（利用 Docker 层缓存）
COPY package*.json ./
RUN npm ci --omit=dev && \
    npm cache clean --force

# 复制所有文件并构建
COPY . .
RUN npm run build

# ----------------------------
# 生产环境镜像
FROM node:22.14.0-alpine3.19

# 安装生产环境必要依赖
RUN apk add --no-cache tini curl

# 设置工作目录
WORKDIR /usr/src/app

# 从构建阶段复制必要文件
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 安全配置
RUN chown -R node:node /usr/src/app && \
    chmod -R 755 /usr/src/app

# 切换到非 root 用户
USER node

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:$PORT/health || exit 1

# 使用 tini 作为 init 进程
ENTRYPOINT ["/sbin/tini", "--"]

# 启动命令
CMD ["node", "dist/main.js"]

# 暴露端口
EXPOSE $PORT