import { Outlet } from "react-router-dom"
import { Sidebar } from "../../../panels/Sidebar/Sidebar"
import { Header } from "../../../panels/Header/Header"




export const BrowserLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-900">
          <aside className="basis-1/6 h-screen overflow-auto">
            <Sidebar/>
          </aside>
          <main className="basis-5/6 relative min-h-screen rounded-l-md bg-gray-200">
            <Outlet />
          </main>
        </div>
      )
}