import { FC } from "react";
import { NavLink } from "react-router-dom";
import Test from "./../icons/Sidebar-icon.svg";

type SidebarProps = {
  routes: {
    path: string;
    name: string;
    Element: FC;
  }[];
};

export const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-full py-3">
        <div className="flex">
            <h1 className="px-4 py-2 text-lg font-semibold mb-5">Money Manager</h1>
            <Test />
            {/* <img src={Test} /> */}
        </div>
      <div className="">
        <ul className="flex flex-col">
            <li className="">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }: {isActive: boolean, isPending: boolean}) => {
                  let activeClass = isActive
                    ? "text-white underline decoration-amber-600 underline-offset-8"
                    : "text-gray-500";

                  return (
                    `hover:bg-gray-700 w-full px-4 py-1 rounded block ` +
                    activeClass
                  );
                }}
              >
              hello
              </NavLink>
            </li>
        </ul>
      </div>
    </div>
  );
};

