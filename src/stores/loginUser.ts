import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AccessEnum from "@/access/accessEnum";
import { DEFAULT_USER } from "@/app/constants/user";

// // 默认用户
// const DEFAULT_USER: API.LoginUserVO = {
//   userName: "未登录",
//   userProfile: "暂无简介",
//   userAvatar: "/assets/notLoginUser.png",
//   // userRole: "guest",
//   //枚举类，将全局状态中的默认用户权限改为“未登录"：
//   userRole: AccessEnum.NOT_LOGIN,
// };

/**
 * 登录用户全局状态
 */
export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: DEFAULT_USER,
  reducers: {
    setLoginUser: (state, action: PayloadAction<API.LoginUserVO>) => {
      return {
        ...action.payload,
      };
    },
  },
});

// 修改状态
export const { setLoginUser } = loginUserSlice.actions;

export default loginUserSlice.reducer;
