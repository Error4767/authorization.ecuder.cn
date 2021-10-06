import { getEncrypt } from './encrypt.js';

export default async function RSADecrypt(cipherText) {
  if (cipherText) {
    const encrypt = await getEncrypt;
    return encrypt.decrypt(cipherText);
  }
}
