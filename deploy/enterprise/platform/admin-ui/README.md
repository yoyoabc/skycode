# Enterprise Admin UI

React + Umi Max + Ant Design Pro。

## 开发

```bash
npm install
npm run dev
```

代理 `/api` → Platform `8090`。开发登录：`admin@enterprise.local`（需 `PLATFORM_AUTH_DEV=1`）。

## 构建

```bash
npm run build
```

产物同步至 `../internal/admin/static/`，随后重建 `enterprise-platform` 镜像。
