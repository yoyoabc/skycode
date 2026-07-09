import { PageContainer } from "@ant-design/pro-components"
import { Result } from "antd"

export default function SecurityPlaceholderPage() {
  return (
    <PageContainer>
      <Result
        status="info"
        title="安全报告"
        subTitle="Semgrep SAST 与扫描报告计划于 Phase 3。详见交付文档 PHASE2-PLAN.md §5.6。"
      />
    </PageContainer>
  )
}
