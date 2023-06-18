
import { useAppSelector } from "@s-m-n/view/shared/hooks/reduxHook";
import { NavLink } from "react-router-dom";
import { NavList } from "../NavList/NavList";
import { ToggleSidebar } from "@s-m-n/view/features/mainLayout/toggleSidebar";
import { motion } from "framer-motion";
import cn from "classnames";

export const LayoutSidebar = () => {
  const isExpanded = useAppSelector(state => state.mainLayout.isSidebarExpand)


  return (
    <div className="bg-gray-900 text-white h-full py-3">
      <motion.div 
        
        className={cn("flex py-2 px-4 items-center mb-5", 
          {"justify-between": isExpanded, "justify-center" : !isExpanded}
        )}
      >
        {isExpanded && (

          <h1 className="text-lg font-semibold">
            Money Manager
          </h1>
        )}
        <ToggleSidebar />
      </motion.div>
      <div  className="">
        <NavList isExpanded={isExpanded} />
      </div>
    </div>
  );
};
