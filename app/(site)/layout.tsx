import { Header } from "@/components/shared/layout/header"
import { DownloadDialog } from "@/components/shared/main/download-dialog"
import type { PropsWithChildren } from "react"

export default function SiteLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <DownloadDialog />
      <div className="pt-16 md:pt-20 lg:pt-24">{children}</div>
    </div>
  )
}
