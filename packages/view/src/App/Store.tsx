import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { mainLayoutSlice } from "@s-m-n/view/entities/mainLayout";

const rootReducer = combineReducers({
  [mainLayoutSlice.name] : mainLayoutSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
