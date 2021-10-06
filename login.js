import {
    messageType,
    createMessage,
    getMessageData,
    isLoaded,
    isMessage,
} from "./message.js";

import networkPath from "./networkPath.js";

function login(verify_data) {
    return new Promise((resolve, reject) => {
        let iframe = document.createElement("iframe");
        iframe.src = networkPath.serverPath + "requestLogin.html";
        iframe.style.display = "none";
        document.body.appendChild(iframe);

        let targetWindow = iframe.contentWindow;

        const handler = (event) => {
            if(!networkPath.isAuthorizationServeOrigin(event.origin)) {
                return;
            }
            const data = event.data;
            // 接收到加载完毕的通知,就发送登录数据到框架页
            if (isLoaded(data)) {
                targetWindow.postMessage(createMessage(messageType, verify_data), "*");
            }else if (isMessage(data)){
                // 如果不是 loaded 但属于 message，返回获取到的登录数据
                // 取出纯数据
                const rawData = getMessageData(data);
                if(rawData.done) {
                    resolve(rawData);
                }else {
                    reject(rawData.error);
                }
                // 清理
                document.body.removeChild(iframe);
                iframe = null;
                window.removeEventListener("message", handler);
            }
        };
        // 添加事件与通知
        window.addEventListener("message", handler);
    });
}

export default login;