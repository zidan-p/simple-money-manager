import { NavLink } from "react-router-dom";
import {FC} from "react"


type LinkListProps = {
  name: string;
  Icon: FC<any>;
  isExpanded : boolean;
  link: string
}


export const LinkList : FC<LinkListProps> = ({name, Icon, isExpanded, link}) => {
    return (
      <NavLink
          to={link}
          className={({ isActive, isPending }: {isActive: boolean, isPending: boolean}) => {
            let activeClass = isActive ? "text-white": "text-gray-500";
            return `hover:bg-gray-700 w-full px-4 py-1 rounded block relative ` + activeClass
          }}
        >
        <div className={`$ top-2 bottom-2 left-0 w-1 rounded-sm bg-white absolute`}></div>
        <div className="flex gap-2 items-center">
          <div className="">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className={`${isExpanded ? "block" : "hidden"}`}>
            {name}
          </h3>
        </div>
      </NavLink>
    )
}