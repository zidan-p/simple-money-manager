import { FC, ReactNode } from "react";

import MenuIcon from "./../icons/menu-icon.svg"

export type NavListData = {
  name: string;
  path: string;
  icon: FC<{className?: string}>;
}[]

export const navListData: NavListData = [
  {
    name: "home",
    path: "/",
    icon: MenuIcon
  }
];
