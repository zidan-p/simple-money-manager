import { FC } from "react";
import { NavLink } from "react-router-dom";
import SideButton from "./../../icons/Sidebar-icon.svg";
import MenuIcon from "./../../icons/menu-icon.svg"
import { useAppDispatch } from "@s-m-n/view/hooks/reduxHook";


type SidebarProps = {
  routes: {
    path: string;
    name: string;
    Element: FC;
  }[];
};

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="bg-gray-900 text-white h-full py-3">
      <div className="flex py-2  px-4 items-center mb-5 justify-between">
          <h1 className="text-lg font-semibold">Money Manager</h1>
          <button className="hover:bg-gray-800 active:bg-gray-700 px-1 rounded">
            <SideButton className="h-7 w-5 text-gray-600 hover:text-white" />
          </button>
      </div>
      <div className="">
        <ul className="flex flex-col">
            <li className="">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }: {isActive: boolean, isPending: boolean}) => {
                  let activeClass = isActive ? "text-white": "text-gray-500";
                  return `hover:bg-gray-700 w-full px-4 py-1 rounded block relative ` + activeClass
                }}
              >
              <div className="top-2 bottom-2 left-0 w-1 rounded-sm bg-white absolute"></div>

              <div className="flex gap-2 items-center">
                <div className="">
                  <MenuIcon className="h-6 w-6" />
                </div>
                <h3>
                  Home
                </h3>
              </div>
              </NavLink>
            </li>
        </ul>
      </div>
    </div>
  );
};

