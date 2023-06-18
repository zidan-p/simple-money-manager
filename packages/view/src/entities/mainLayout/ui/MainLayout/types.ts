import { ReactNode } from "react";

export type MainLayoutProps = {
    sidebarSlot: ReactNode;
    headerSlot: ReactNode;
}

export type MainLayoutVariant = {
    expand: object;
    narrow: object; 
}