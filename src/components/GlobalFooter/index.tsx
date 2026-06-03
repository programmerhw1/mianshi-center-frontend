import React from "react";
import "./index.css";

/**
 * 全局底部栏组件
 *
 * @author yupi
 */
export default function Index() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="global-footer">
      <div>
        © {currentYear} 面试中心平台
      </div>
      <div>
        <a href="https://www.codefather.cn" target="_blank">
          作者：---程序员卡卡
        </a>
      </div>
    </div>
  );
}
