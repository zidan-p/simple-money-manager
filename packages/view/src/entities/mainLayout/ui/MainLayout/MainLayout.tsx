import { ReactNode } from "react";
import { Outlet } from "react-router-dom"
import { useAppSelector } from "@s-m-n/view/shared/hooks/reduxHook";
import {motion} from "framer-motion";
import { MainLayoutVariant, MainLayoutProps } from "./types";

const sidebarVariant : MainLayoutVariant = {
  expand: {width: "16%"},
  narrow: {width: "56px"}
}

export const MainLayout = (props: MainLayoutProps) => {
  const isExpanded = useAppSelector(state => state.mainLayout.isSidebarExpand);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <div className="flex grow">
        <motion.aside 
          variants={sidebarVariant}
          animate={isExpanded ? "expand" : "narrow"}
          className={` overflow-hidden`}
        >
          {props.sidebarSlot}
        </motion.aside>
        <main className="grow relative rounded-l-md bg-gray-200">
          {props.headerSlot}
          <Outlet />
        </main>
      </div>
    </div>
  )
}