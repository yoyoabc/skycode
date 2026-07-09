# enterprise-platform

企业控制面 Go 服务 + 嵌入式管理后台（`/admin/`）。

## Docker Compose

```bash
cd deploy/enterprise
docker compose --profile platform up -d --build enterprise-platform
./scripts/smoke-phase2.sh
```

生产镜像使用 `go build -tags production`：License 导入须 RSA 签名。本地 `go run` 为开发构建，勿用于生产。

## 主要 API

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/admin/` | 管理后台 |
| GET/PUT | `/api/v1/model-config` | 模型配置 |
| POST | `/api/v1/model-config/apply` | 下发 Engine 配置 |
| GET | `/api/v1/tenants` | 租户 |
| GET | `/api/v1/usage/summary` | 用量 |
| GET | `/api/v1/monitor/health` | 健康检查 |
| GET | `/api/v1/audit/logs` | 审计日志 |

详见 [deploy/enterprise/README.md](../../README.md)。
