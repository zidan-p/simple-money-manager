import { FC } from "react";
import { NavLink } from "react-router-dom";
import SideButton from "@s-m-n/view/components/shared/icons/Sidebar-icon.svg";
import MenuIcon from "@s-m-n/view/components/shared/icons/menu-icon.svg"
import { useAppDispatch,useAppSelector } from "@s-m-n/view/shared/hooks/reduxHook";
import { toggle } from "./SidebarSlice";
import { LinkList } from "./elements/LinkLIst";

type SidebarProps = {
  routes: {
    path: string;
    name: string;
    Element: FC;
  }[];
};

export const Sidebar = () => {
  const isExpanded = useAppSelector(state => state.sidebar.isSidebarExpand)
  const dispatch = useAppDispatch();

  return (
    <div className="bg-gray-900 text-white h-full py-3">
      <div className="flex py-2  px-4 items-center mb-5 justify-between">
          <h1 className={`${isExpanded? "block" : "hidden"} text-lg font-semibold`}>Money Manager</h1>
          <button 
            onClick={()=>dispatch(toggle())}
            className="hover:bg-gray-800 active:bg-gray-700 px-1 rounded"
          >
            <SideButton className="h-7 w-5 text-gray-600 hover:text-white" />
          </button>
      </div>
      <div className="">
        <ul className="flex flex-col">
            <li className="">
              <LinkList link="/" name="Home" Icon={MenuIcon} isExpanded={isExpanded} />
              <LinkList link="/hello" name="Hello" Icon={MenuIcon} isExpanded={isExpanded} />
            </li>
        </ul>
      </div>
    </div>
  );
};

