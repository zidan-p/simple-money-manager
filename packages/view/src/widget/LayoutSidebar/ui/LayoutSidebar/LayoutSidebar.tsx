
import { useAppSelector } from "@s-m-n/view/shared/hooks/reduxHook";
import { NavLink } from "react-router-dom";
import { NavList } from "../NavList/NavList";


export const LayoutSidebar = () => {
  const isExpanded = useAppSelector(state => state.mainLayout.isSidebarExpand)


  return (
    <div className="bg-gray-900 text-white h-full py-3">
      <div className="flex py-2  px-4 items-center mb-5 justify-between">
        <h1 className="text-lg font-semibold">
          Money Manager {isExpanded ? "hello" : "hi"}
        </h1>

      </div>
      <div className="">
        <NavList />
      </div>
    </div>
  );
};
