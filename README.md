# skycode — 企业私有化 AI 编程工具

基于 Kilo 引擎的私有化交付源码：VS Code 扩展、CLI/Engine、企业管理后台（Platform）。

## 目录

| 路径 | 说明 |
|---|---|
| `packages/opencode/` | Kilo CLI / Engine |
| `packages/kilo-vscode/` | VS Code 扩展（企业版） |
| `deploy/enterprise/` | Docker Compose、Platform、部署脚本 |

## 环境要求

- [Bun](https://bun.sh) 1.3+
- Docker（部署 Platform / Engine）
- Go 1.22+（本地开发 Platform 时）

## 开始

```bash
bun install
cd deploy/enterprise && cp env/test.cloud.phase2.env.sample .env
# 配置 .env 与 samples/license-public.pem（由供应商提供）
docker compose --profile platform up -d --build
```

详细步骤见 [deploy/enterprise/README.md](./deploy/enterprise/README.md)。

## License

见仓库根目录 `LICENSE`。企业授权文件由供应商单独签发，通过管理后台上传激活。
