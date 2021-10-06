import {
    getMessageData,
    isMessage,
} from "./message.js";

import networkPath from "./networkPath.js";

// 用于弹出外部窗口登录
function popupLogin() {
    return new Promise((resolve, reject) => {
        // 弹出外部窗口
        window.open(networkPath.serverPath + "loginHasUI.html");

        const handler = (event) => {
            if(!networkPath.isAuthorizationServeOrigin(event.origin)) {
                return;
            }
            const data = event.data;
            // 接收返回信息
            if (isMessage(data)) {
                // 取出纯数据
                const rawData = getMessageData(data);
                if (rawData.done) {
                    resolve(rawData);
                } else {
                    reject(rawData.error);
                }
                // 清理
                window.removeEventListener("message", handler);
            }
        };
        // 等待接收返回信息
        window.addEventListener("message", handler);
    });
}

export default popupLogin;