import { getEncrypt } from './encrypt.js';

export default async function RSAEncrypt(text) {
  if (text) {
    const encrypt = await getEncrypt;
    return encrypt.encrypt(text);
  }
}

