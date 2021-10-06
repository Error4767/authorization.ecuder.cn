import { isMessage } from "./message.js";

import networkPath from "./networkPath.js";

function logout() {
    return new Promise((resolve, reject) => {
        let iframe = document.createElement("iframe");
        iframe.src = networkPath.serverPath + "clearLoginState.html";
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        const handler = (event) => {
            if(!networkPath.isAuthorizationServeOrigin(event.origin)) {
                return;
            }
            const data = event.data;
            if (isMessage(data)) {
                // 清理 iframe
                document.body.removeChild(iframe);
                iframe = null;
                // 结束 promise 返回状态信息
                resolve(true);
                window.removeEventListener("message", handler);
            }
        };
        // 添加事件与通知
        window.addEventListener("message", handler);
    })
}

export default logout;