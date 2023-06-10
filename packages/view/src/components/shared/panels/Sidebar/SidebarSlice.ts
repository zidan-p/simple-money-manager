import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState : {isSidebarExpand : boolean} = {
    isSidebarExpand : true
}

const sidebarSlide = createSlice({
    name: "sidebar",
    initialState,
    reducers : {
        toggle : state => {state.isSidebarExpand = !state.isSidebarExpand}
    }
})


export default sidebarSlide.reducer;
export const {toggle} = sidebarSlide.actions;