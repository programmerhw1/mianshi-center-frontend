"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { usePathname } from "next/navigation";
import checkAccess from "@/access/checkAccess";
import Forbidden from "@/app/forbidden";
import React from "react";
import { findAllMenuItemByPath } from "../../config/menus";
import AccessEnum from "@/access/accessEnum";

/**
 * 统一权限校验拦截器
 * @param children
 * @constructor
 */
const AccessLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  console.log("AccessLayout 组件渲染了");
  const pathname = usePathname();
  //当前登录用户
  const loginUser = useSelector((state: RootState) => state.loginUser);
  // 权限校验 获取当前路径需要的权限
  const menu = findAllMenuItemByPath(pathname);
  // console.log("menu", menu);
  // console.log("当前路径:", pathname);
  const needAccess = menu?.access ?? AccessEnum.NOT_LOGIN;
  const canAccess = checkAccess(loginUser, needAccess);
  if (!canAccess) {
    return <Forbidden />;
  }
  return <>{children}</>;
};

export default AccessLayout;
