// ==UserScript==
// @name        无图模式
// @name:zh-CN  无图模式
// @name:en     No picture
// @description 隐藏网站内的图片
// @description:en Hide picture
// @version     0.0.2
// @author      l.lyndon
// @match       *://*.zhihu.com/*
// @match       *://*.douban.com/*
// @match       *://*.msn.cn/*
// @icon        data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAHAAcAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAwADADASIAAhEBAxEB/8QAGwAAAgMAAwAAAAAAAAAAAAAABgcABQgCAwT/xAA2EAABAwMBBAcHAgcAAAAAAAABAgMEAAURBgcSITETIkFRYXGRFDJCgZKhsRXBIzM2U2Jygv/EABkBAAIDAQAAAAAAAAAAAAAAAAIGAwQFAf/EACkRAAEEAQIFAgcAAAAAAAAAAAEAAgMRBAUxEhMhUWFBoQYigZGx0fD/2gAMAwEAAhEDEQA/ANjS5DEWM5JkupaZaSVLWo4CQO2k5qzaRdZ0lbVmcMGGk4SsJHSrHeSfd8hVvtuvygWNPx14BAek4PPj1U/bPpStJAIBI48vGonu9AlHW9Vk5hghNAbkd0QRda6pjL3kXqQvwdCVj7iiiybVprRSi7wGpCO1xg7ivpPA/alvQ7qzUL9ouFshRozby5roSStRASneA4Y7eNcZxONBZWJm5geGxPN+TY91q3Tup7LfkZt8xKnQMqZX1XE/8n8jNXFZfaccZeS404ptxBylaTgg94I5U3tlmtHrqv8AR7s4FzEpyw8eBdA5g/5Dn4iia++hTFpuuDIcIphTjsfQ/pLTWM43LVNymFRIW+pKP9U9UfYUvdbaan3SS1crZcHG5UcDo2VL3UgjtSfhV+aLnc9Kve97eOfPNcaBjyx3EEptyZGTGUbm/dAdk1w9Ef8A03VEZyNIRwL+5j6k/uOFdlscOqNcpujTajbLWkoZWocFud4+Zz5AV7tqEeIvSj8h9pBeaUgMrI6ySVcgfLPCpsq/o9rl/Pd/NWSW8syNFHZaBdEMd2RG2ifl8ddyEVVY6WdeZ1LbXI+elEpvdx25UBj0qupm7JNHv+1N6guTSm20DMRtQwVE/GR2Du9aqtFlU8DGkyJ2tZ3+3lCe0OzuWbVUtooKWH1l5hWOBSo5I+RyKHq0lqCx22+wvZLlHDqAcoUDhSD3pPZQQ9slgF0lq8SkN591TaVH14fiiLDfRa+doM/NLoRbT9KSauluhXSMI0+Ol9oKC91RI4jkeFWuk9Ly5iEwLBbD0CD8A3W0Z55UeH705bTs103CUFvtvzlj++vq/SMD1ovjMMRmUsx2W2WkjCUISEgfIUQYaonopcX4fmcKnfTew/q/KBtGbOIVsUiZd1InSxgpbx/CbPkfePieHhR7UqUYAGyZcbFixmcEQoL/2Q==
// @grant       GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_openInTab
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_notification
// @grant       GM_info
// @grant       window.onurlchange
// @grant       unsafeWindow
// @sandbox     JavaScript
// @license     MIT License
// @run-at      document-end
// @namespace   https://github.com/lyndonliu89757/noPic
// @supportURL  https://github.com/lyndonliu89757/noPic
// @homepageURL https://github.com/lyndonliu89757/noPic
// ==/UserScript==

'use strict';

var menu_ALL = [
  ['menu_hidePicture', '隐藏图片', '隐藏图片', true],
  ['menu_hideVideo', '隐藏视频', '隐藏视频', true],
], menu_ID = [];
for (let i = 0; i < menu_ALL.length; i++) { // 如果读取到的值为 null 就写入默认值
  if (GM_getValue(menu_ALL[i][0]) == null) { GM_setValue(menu_ALL[i][0], menu_ALL[i][3]) };
}
registerMenuCommand();

// 注册脚本菜单
function registerMenuCommand() {
  if (menu_ID.length > menu_ALL.length) { // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
    for (let i = 0; i < menu_ID.length; i++) {
      GM_unregisterMenuCommand(menu_ID[i]);
    }
  }
  menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () { window.GM_openInTab('https://github.com/lyndonliu89757/noPic', { active: true, insert: true, setParent: true }); window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/473638/feedback', { active: true, insert: true, setParent: true }); });
}

// 菜单开关
function menu_switch(menu_status, Name, Tips) {
  if (menu_status == 'true') {
    GM_setValue(`${Name}`, false);
    GM_notification({ text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function () { location.reload(); } });
  } else {
    GM_setValue(`${Name}`, true);
    GM_notification({ text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function () { location.reload(); } });
  }
  registerMenuCommand(); // 重新注册脚本菜单
};


// 返回菜单值
function menu_value(menuName) {
  for (let menu of menu_ALL) {
    if (menu[0] == menuName) {
      return menu[3]
    }
  }
}

function changeElementDisplay() {
  Array.from(document.getElementsByTagName('img')).map(i => i.style.display = menu_value('menu_hidePicture') ? 'none' : 'inline');
  Array.from(document.getElementsByTagName('video')).map(i => i.style.display = menu_value('menu_hideVideo') ? 'none' : 'inline');
}

(function () {
  // Violentmonkey 比 Tampermonkey 加载更早，会导致一些元素还没加载，因此需要延迟一会儿
  // Tampermonkey 4.18.0 版本可能需要延迟一会执行
  if (GM_info.scriptHandler === 'Violentmonkey' || (GM_info.scriptHandler === 'Tampermonkey' && parseFloat(GM_info.version.slice(0, 4)) >= 4.18)) {
    setTimeout(start, 300);
  } else {
    start();
  }

  function start() {
    setTimeout(changeElementDisplay, 300);
  }
})();
