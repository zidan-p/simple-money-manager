import { Outlet } from "react-router-dom"
import { Sidebar } from "../../../panels/Sidebar/Sidebar"
import { Header } from "../../../panels/Header/Header"

// # using alias
import { useAppSelector } from "@s-m-n/view/hooks/reduxHook"


export const DesktopLayout = () => {
  const isExpanded = useAppSelector(state => state.sidebar.isSidebarExpand);

    return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex grow">
          <aside className={`${isExpanded ? "basis-1/6" : "basis-14"} overflow-auto`}>
            <Sidebar/>
          </aside>
          <main className="grow relative rounded-l-md bg-gray-200">
            <Header />
            <Outlet />
          </main>
        </div>
      </div>
    )
}