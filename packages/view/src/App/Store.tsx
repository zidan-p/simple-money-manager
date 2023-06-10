import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./../components/shared/panels/Sidebar/SidebarSlice";

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;