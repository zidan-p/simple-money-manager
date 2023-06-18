import { NavLink } from "react-router-dom";
import { navListData } from "./data/NavListData";
import { FC, ReactNode } from "react";
import cn from "classnames"

type NavListContentProps = {
  iconSlot : FC<{className?: string}>;
  nameSlot : string;
  isActive : boolean;
  isExpanded : boolean;
}

const NavListContent = (props: NavListContentProps) => {
  return(
    <>
    {props.isActive && <div className="top-2 bottom-2 left-0 w-1 rounded-sm bg-white absolute" />}
    <div className="flex gap-2 items-center">
      <div className="py-1">
        <props.iconSlot className="w-7 h-6" />
      </div>
      {props.isExpanded && <h3>{props.nameSlot}</h3>}
    </div>
    </>
  )
}

export const NavList = (props: {isExpanded : boolean}) => {
  return(
    <ul className="flex flex-col">
        {navListData.map((navData, index) => (
          <li key={index} className="">
            <NavLink
              to={"/"}
              className={`hover:bg-gray-700 w-full px-3 py-1 rounded block relative`}
            >
              {({isActive})=> (
                <NavListContent 
                  isActive={isActive} 
                  iconSlot={navData.icon}
                  nameSlot={navData.name}
                  isExpanded={props.isExpanded}
                /> 
              )}
            </NavLink>
          </li>
        ))}
    </ul>
  )
}