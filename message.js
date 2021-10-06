const loadedType = "loaded";
const messageType = "message";

// message 信息类型
const MESSAGE_TYPES = {
    [loadedType]: {
        type: loadedType,
    },
    [messageType]: {
        type: messageType,
        value: null
    }
};

function copy(data) {
    return JSON.parse(JSON.stringify(data));
}

function createMessage(messageType, message) {
    if(MESSAGE_TYPES[messageType]) {
        let result = copy(MESSAGE_TYPES[messageType]);
        // 如果是 message 类型就设置值
        result.type === messageType && (result.value = message);
        return result;
    }
}

// 检测是否是 message 信息类型
function isMessage(message) {
    return MESSAGE_TYPES.hasOwnProperty(message?.type);
}

// 检测是否是 loaded 消息
function isLoaded(message) {
    if(message?.type === loadedType) {
        return true;
    }
}

// 获得消息数据
function getMessageData(message) {
    if(message.type === messageType) {
        return message.value;
    }
}

export {
    loadedType,
    messageType,
    createMessage,
    isMessage,
    isLoaded,
    getMessageData
}