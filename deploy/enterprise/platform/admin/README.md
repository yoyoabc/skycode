# Admin 管理后台

Ant Design Pro 源码：`../admin-ui/`。构建产物在 `internal/admin/static/`，由 Platform 在 `/admin/` 提供。

## 本地开发

```bash
cd deploy/enterprise/platform/admin-ui
npm install
npm run dev
npm run build
```

生产环境使用 OIDC 登录。开发环境可在 `PLATFORM_AUTH_DEV=1` 时使用邮箱登录（勿用于生产）。
