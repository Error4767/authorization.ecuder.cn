import JSEncrypt from './jsencrypt.js';

import networkPath from "../networkPath.js";

let encrypt = {};

// 获取 encrypt，因为需要请求一个公钥
export let getEncrypt = fetch(networkPath.authVerifyServerPath + "public_key")
  .then(r => r.text())
  .then(PUBLIC_KEY => {
    // 设置对象
    encrypt = new JSEncrypt();
    encrypt.setPublicKey(PUBLIC_KEY);
    return encrypt;
  });

