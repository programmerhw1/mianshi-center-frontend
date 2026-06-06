"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, { useCallback, useEffect } from "react";
import store, { AppDispatch } from "@/stores";
import { Provider, useDispatch } from "react-redux";
import { getLoginUserUsingGet } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import AccessLayout from "@/access/AccessLayout";

/**
 * 执行初始化逻辑的布局（多封装一层）使用的是自定义高级组件
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  //// 先获取 dispatch
  const dispatch = useDispatch<AppDispatch>();
  /**
   * 全局初始化函数，有全局单次调用的代码，都可以写到这里
   * 下面注释代码仅供参考
   */

  // const doInit = useCallback(() => {
  //   console.log("hello 欢迎来到我的项目");
  // }, []);
  //
  // // 只执行一次
  // useEffect(() => {
  //   doInit();
  // }, []);
  const doInitLoginUser = useCallback(async () => {
    // 获取用户信息
    const res = await getLoginUserUsingGet();
    if (res.data) {
      //触发更新
      dispatch(setLoginUser(res.data));
    } else {
      // todo 测试代码，实际可删除
      // setTimeout(() => {
      //   const testUser = {
      //     userName: "测试登录",
      //     id: 1,
      //     // userAvatar: "/assets/notLoginUser.png",
      //     userRole: ACCESS_ENUM.ADMIN
      //   };
      //   dispatch(setLoginUser(testUser));
      // }, 3000);
    }
  }, []);
  useEffect(() => {
    doInitLoginUser();
  }, []);

  return <>{children}</>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
