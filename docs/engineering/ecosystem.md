# 生态

## PWA

- 通过 service worker 与 离线存储（indexDB）技术实现的离线存储渐进式应用。类似网页版的小程序
- 核心优势
  - 渐进
  - 可链接
  - 响应式
- App shell
- 版本控制缓存
- manifest
  - 包含：名称、icon、描述、背景
  - 用于被添加到主屏幕 A2HS
- service worker
  - 消息推送
  - 基本事件
    - fetch
      - 监听请求，拦截
    - install
      - waitUtil
        - 添加 caches
        - 这里不使用 webStore 是因为 webStore 是同步的，会阻塞。
        - 使用 cachesStore 进行存储
    - active
      - 处理缓存更新的时候的清理工作

## WebAssmebly

- 跳过编译过程，直接到机器码，达到极致到速度。一般都是使用其他语言编写，RUST、C#、java、GO
- 它是更低阶的语言，接近汇编。

## Serverless

- 后端聚焦数据的微服务
- 前端 Fass+BaaS，进行 ServerLess 的 BFF 层
