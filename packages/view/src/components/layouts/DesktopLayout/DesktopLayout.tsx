import { Outlet } from "react-router-dom"
import { Sidebar } from "../../Sidebar"
import { Header } from "../../Header"




export const DesktopLayout = () => {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex grow">
          <aside className="basis-1/6 overflow-auto">
            <Sidebar/>
          </aside>
          <main className="basis-5/6 relative rounded-l-md bg-gray-200">
            <Header />
            <Outlet />
          </main>
        </div>
      </div>
    )
}