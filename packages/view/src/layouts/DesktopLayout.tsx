import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Header } from "../components/Header"




export const DesktopLayout = () => {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="flex">
          <aside className="basis-1/6 h-screen overflow-auto">
            <Sidebar/>
          </aside>
          <main className="basis-5/6 relative min-h-screen rounded-l-md bg-gray-200">
            <Outlet />
          </main>
        </div>
      </div>
    )
}