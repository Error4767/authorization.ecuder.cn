import isObject from './isObject.js';
import RSAEncrypt from './RSA/RSAEncrypt.js';
import RSADecrypt from './RSA/RSADecrypt.js';
import fetch from "./fetch.js";

import networkPath from "./networkPath.js";

async function requestLogin(verify_data) {
  const encrypted_verify_data = await RSAEncrypt(JSON.stringify(verify_data));
  return isObject(verify_data) ? fetch(networkPath.authVerifyServerPath + "login", {
    method: 'post',
    headers: {
      verify_data: encrypted_verify_data
    }
  })
    .then(r => r.text())
    .then(async cipherText => {
      const token = await RSADecrypt(cipherText);
      return token;
    }) : Promise.reject('data is not json');
}

export default requestLogin;