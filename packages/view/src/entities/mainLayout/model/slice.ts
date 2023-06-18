import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { MainLayout } from "./types"

const initialState : MainLayout= {
    isSidebarExpand : true
}

export const mainLayoutSlice = createSlice({
    name: "mainLayout",
    initialState,
    reducers : {
        toggle : state => {state.isSidebarExpand = !state.isSidebarExpand}
    }
})
export const {toggle} = mainLayoutSlice.actions;