import { configureStore } from "@reduxjs/toolkit";
import loginUser from "@/stores/loginUser";


const store = configureStore({
  reducer: {
    // 在这里用来存放全局的状态（比如登录状态等等）
    loginUser,
  },
});

// 用于类型推断和提示
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
