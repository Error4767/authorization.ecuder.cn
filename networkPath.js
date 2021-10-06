const allowedOrigins = [
    "https://ecuder.cn",
    "https://transfer.ecuder.cn",
];

export default {
    // 服务器地址，用于框架内的静态文件
    serverPath: "https://authorization.ecuder.cn/",

    // 用户验证服务地址
    authVerifyServerPath: "https://api.ecuder.cn/",
    // 检测是否允许
    isAllow(origin) {
        return allowedOrigins.includes(origin);
    },
    // 检测服务器来源，防止其他 message 错误触发动作
    isAuthorizationServeOrigin(origin) {
        return origin === "https://authorization.ecuder.cn"
    }
}