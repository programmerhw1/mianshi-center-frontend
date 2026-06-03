"use client";
import "./index.css";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input } from "antd";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Index from "@/components/GlobalFooter";
import menus from "../../../config/menus";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import getAccessibleMenus from "@/access/menuAccess";

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
            height={32}
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
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
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
