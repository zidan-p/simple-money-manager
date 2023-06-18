
import { useAppSelector } from "@s-m-n/view/shared/hooks/reduxHook";
import { NavLink } from "react-router-dom";
import { NavList } from "../NavList/NavList";
import { ToggleSidebar } from "@s-m-n/view/features/mainLayout/toggleSidebar";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import { MainLayoutVariant } from "@s-m-n/view/entities/mainLayout";

const layoutSidebarVariant = {
  narrow: {
    x: "-100%",
    opacity: 0,
    // transition: {
    //   duration: 0.1
    // }
  },
  expand : {
    x: 0,
    opacity: 1
  }
}

export const LayoutSidebar = () => {
  const isExpanded = useAppSelector(state => state.mainLayout.isSidebarExpand)
  return (
    <div className="bg-gray-900 text-white h-full py-3">
      <motion.div 
        
        className={cn("flex py-2 px-4 items-center mb-5", 
          {"justify-between": isExpanded, "justify-center" : !isExpanded}
        )}
      >
        <AnimatePresence >
          {isExpanded && (
            <motion.h1 
              variants={layoutSidebarVariant}
              initial="expand"
              exit="narrow"
              className="text-lg font-semibold truncate"
            >
              Money Manager
            </motion.h1>
          )}
        </AnimatePresence>
        <ToggleSidebar />
      </motion.div>
      <div  className="">
        <NavList isExpanded={isExpanded} />
      </div>
    </div>
  );
};
