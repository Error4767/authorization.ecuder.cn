import {
    messageType,
    createMessage,
    getMessageData,
    isLoaded,
    isMessage,
} from "./message.js";

import networkPath from "./networkPath.js";

function getLoginState() {
    return new Promise((resolve, reject) => {
        let iframe = document.createElement("iframe");
        iframe.src = networkPath.serverPath + "loginState.html";
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        let targetWindow = iframe.contentWindow;

        const handler = (event) => {
            if(!networkPath.isAuthorizationServeOrigin(event.origin)) {
                return;
            }
            const data = event.data;
            // 接收到加载完毕的通知,就发送数据请求状态
            if (isLoaded(data)) {
                targetWindow.postMessage(createMessage(messageType), "*");
            } else if (isMessage(data)) { // 如果不是 loaded 但属于 message，返回获取到的状态数据
                // 清理 iframe
                document.body.removeChild(iframe);
                iframe = null;
                // 结束 promise 返回状态信息
                resolve(getMessageData(data));
                window.removeEventListener("message", handler);
            }
        };
        // 添加事件与通知
        window.addEventListener("message", handler);
    })
}

export default getLoginState;