# Enterprise 私有化部署

企业控制面（Platform + Admin）、Kilo Engine、网关与 VS Code 扩展源码。

## 组件

| 路径 | 说明 |
|---|---|
| `docker-compose.yml` | Engine、Qdrant、Platform（profile `platform`）、网关（profile `gateway`） |
| `platform/` | Go API + 管理后台（Ant Design Pro） |
| `apisix/`、`bridge/` | API 网关与桥接 |
| `config/` | Engine 模型配置模板 |
| `env/` | 环境变量样例 |

## 快速启动（Platform）

```bash
cd deploy/enterprise
cp env/test.cloud.phase2.env.sample .env
# 编辑 .env：PLATFORM_PG_PASSWORD、PLATFORM_JWT_SECRET、OIDC 等
cp /path/from/vendor/license-public.pem samples/license-public.pem
docker compose --profile platform up -d --build postgres redis enterprise-platform
./scripts/smoke-phase2.sh
```

生产环境请设置 `PLATFORM_AUTH_DEV=0`，禁用开发直登。

## License 激活（客户）

1. 使用供应商提供的离线 License 文件（`.json`）。
2. 登录管理后台 → **租户** → **上传授权文件** → **激活**。
3. 详见 `samples/LICENSE-PUBLIC-KEY.md`（验签公钥部署）。

授权文件由**软件供应商**在客户环境外签发；本仓库仅包含验签与导入逻辑。

## VS Code 扩展

```bash
cd packages/kilo-vscode
bun install
bun run compile
```
