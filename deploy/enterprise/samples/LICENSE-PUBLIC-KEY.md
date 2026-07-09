# License 验签公钥

部署前由软件供应商提供 `license-public.pem`，放置于本目录并挂载到 Platform：

```bash
cp /path/from/vendor/license-public.pem deploy/enterprise/samples/license-public.pem
```

在 `.env` 中设置：

```
PLATFORM_LICENSE_PUBLIC_KEY_PATH=/samples/license-public.pem
```
