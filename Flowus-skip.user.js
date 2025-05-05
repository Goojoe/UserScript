// ==UserScript==
// @name         FlowUs 外链自动跳转并删除弹窗
// @namespace    https://flowus.cn
// @version      1.1
// @description  自动跳过外链提示并移除 FlowUs 的安全警告弹窗
// @match        https://flowus.cn/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // 1. 拦截点击外链，直接新标签打开
  document.addEventListener(
    "click",
    function (e) {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.href;
      const isExternal =
        /^https?:\/\//.test(href) && !href.includes("flowus.cn");
      if (isExternal) {
        e.preventDefault();
        window.open(href, "_blank");
      }
    },
    true
  );

  // 2. 定时清除安全提示弹窗（id 精准匹配 modalContent）
  setInterval(() => {
    const modal = document.getElementById("modalContent");
    if (modal) {
      modal.remove();
      console.log("[FlowUs 脚本] 安全警告弹窗已自动移除");
    }
  }, 300); // 每 300ms 检查一次
})();
