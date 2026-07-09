import { PageContainer } from "@ant-design/pro-components"
import { Result } from "antd"

export default function IndexPlaceholderPage() {
  return (
    <PageContainer>
      <Result
        status="info"
        title="代码索引"
        subTitle="语义索引与 Qdrant 管道计划于 Phase 3 交付。详见交付文档 PHASE2-PLAN.md §5.5。"
      />
    </PageContainer>
  )
}
