import { NavLink } from "react-router-dom";
import { navListData } from "./data/NavListData";
import { ReactNode } from "react";


type NavListContentProps = {
  iconSlot : ReactNode;
  nameSlot : string;
  isActive : boolean;
}

const NavListContent = (props: NavListContentProps) => {
  return(
    <>
    {props.isActive && <div className="top-2 bottom-2 left-0 w-1 rounded-sm bg-white absolute" />}
    <div className="flex gap-2 items-center">
      <div className="">
        {props.iconSlot}
      </div>
      <h3>{props.nameSlot}</h3>
    </div>
    </>
  )
}

export const NavList = () => {
  return(
    <ul className="flex flex-col">
        {navListData.map((navData, index) => (
          <li key={index} className="">
            <NavLink
              to={"/"}
              className={`hover:bg-gray-700 w-full px-4 py-1 rounded block relative`}
            >
              {({isActive})=> (
                <NavListContent 
                  isActive={isActive} 
                  iconSlot={navData.icon}
                  nameSlot={navData.name}
                /> 
              )}
            </NavLink>
          </li>
        ))}
    </ul>
  )
}