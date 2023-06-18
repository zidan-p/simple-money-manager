import { MainLayout } from "@s-m-n/view/entities/mainLayout"
import { LayoutHeaderDesktop } from "@s-m-n/view/widget/LayoutHeader"
import { LayoutSidebar } from "@s-m-n/view/widget/LayoutSidebar"




export const DesktopLayout = () => {
  return (
    <MainLayout 
      headerSlot={<LayoutHeaderDesktop />}
      sidebarSlot={<LayoutSidebar />}
    />
  )
}