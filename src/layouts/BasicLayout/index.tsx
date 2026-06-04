"use client";
import "./index.css";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, message } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Index from "@/components/GlobalFooter";
import menus from "../../../config/menus";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { AppDispatch, RootState } from "@/stores";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/app/constants/user";
import { useRouter } from "next/navigation";

// const MenuCard = () => {
//   const { token } = theme.useToken();
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Divider
//         style={{
//           height: "1.5em",
//         }}
//         type="vertical"
//       />
//     </div>
//   );
// };

const Demo = ({ children }: { children?: React.ReactNode }) => {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [pathname, setPathname] = useState("/list/sub-page/sub-sub-page1");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
    return;
  };

  return (
    <div
      id="test-pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        layout={"top"}
        title={"面试中心"}
        logo={
          <Image
            src={"/assets/logo.png"}
            alt={"图片显示失败"}
            width={"32"}
            height={"32"}
          />
        }
        location={{
          pathname,
        }}
        menu={{
          type: "group",
        }}
        avatarProps={{
          src: loginUser.userAvatar || "/assets/logo.png",
          size: "small",
          title: loginUser.userName || "卡卡",
          render: (props, dom) => {
            // 使用三元表达式判断用户是否登录
            return loginUser.id ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event) => {
                    const key = event.key;
                    if (key === "logout") {
                      userLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            ) : (
              <div onClick={() => router.push("/user/login")}>{dom}</div>
            );
          },
        }}
        footerRender={() => <Index />}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            props.layout !== "side" && document.body.clientWidth > 1400 ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: "rgba(0, 0, 0, 0.15)",
                      }}
                    />
                  }
                  placeholder="搜索方案"
                  variant="borderless"
                />
              </div>
            ) : undefined,
            <a
              key={"github"}
              href={"https://github.com/programmerhw1"}
              target={"_blank"}
            >
              <GithubFilled key="GithubFilled" />,
            </a>,
          ];
        }}
        // 菜单项数据
        menuDataRender={() => {
          // return [
          //   {
          //     path: "/",
          //     name: "主页",
          //   },
          //   {
          //     path: "/banks",
          //     name: "题库",
          //   },
          // ];
          // TODO下面这两行代码的区别就是是否过滤了没有权限的菜单，第一行代码是根据当前用户权限过滤菜单，第二行代码是返回所有菜单
          // return getAccessibleMenus(loginUser,menus);
          return menus;
        }}
        // 菜单渲染
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"}>{dom}</Link>
        )}
        headerTitleRender={(logo, title, _) => {
          const defaultDom = (
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                font: "inherit",
                cursor: "pointer",
              }}
              onClick={() => console.log("headerTitle clicked")}
            >
              {logo}
              {title}
            </button>
          );
          if (
            typeof document === "undefined" ||
            document.body.clientWidth < 1400
          ) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;
          return (
            <>
              {defaultDom}
              {/*<MenuCard />*/}
            </>
          );
        }}
      >
        {children}
        {JSON.stringify(loginUser)}
      </ProLayout>
    </div>
  );
};

interface Props {
  children?: React.ReactNode;
}
export default function BasicLayout({ children }: Props) {
  listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log(res);
  });
  return (
    <div style={{ padding: 24 }}>
      <Demo> {children}</Demo>
    </div>
  );
}
