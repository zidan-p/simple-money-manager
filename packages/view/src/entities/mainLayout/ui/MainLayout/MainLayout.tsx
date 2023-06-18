import { ReactNode } from "react";
import { Outlet } from "react-router-dom"
import { useAppSelector } from "@s-m-n/view/shared/hooks/reduxHook";

// # using alias
// import { useAppSelector } from "@s-m-n/view/hooks/reduxHook"


type Props = {
    sidebarSlot: ReactNode;
    headerSlot: ReactNode;
}

export const MainLayout = (props: Props) => {
  const isExpanded = useAppSelector(state => state.mainLayout.isSidebarExpand);

    return (
      <div className="min-h-screen flex flex-col bg-gray-900">
        <div className="flex grow">
          <aside className={`${isExpanded ? "basis-1/6" : "basis-14"} overflow-auto`}>
            {props.sidebarSlot}
          </aside>
          <main className="grow relative rounded-l-md bg-gray-200">
            {props.headerSlot}
            <Outlet />
          </main>
        </div>
      </div>
    )
}