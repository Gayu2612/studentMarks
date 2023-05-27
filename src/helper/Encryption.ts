import * as crypto from "crypto";
import * as CryptoJS from "crypto-js";
import * as Config from "../config/Enironment";

let encryptMode: boolean;
let password = "UPTURN@1510";
let conversionOutput: string;
/**
 * @author Murugan S  
 * @date  09-01-2022
 * @description This function return password encryption.
 * @param {String} text
 */
export let hashPassword = async (text) => {
  return await new Promise((resolve, reject) => {
    const hash = crypto.createHmac("sha256", Config.SERVER.SALT);
    hash.update(text.toString());
    resolve(hash.digest("hex"));
  });
};
   
/**
 * @author Murugan S
 * @date  09-01-2022
 * @description This function return encrypted item for given string
 * @param {String} text
 */
export let encryptData = (text) => {
  try {
    const cip = crypto.createCipher("aes192", Config.SERVER.CIPER);
    let encrypted = cip.update(text.toString(), "utf8", "hex");
    encrypted += cip.final("hex");
    return encrypted;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * @author Murugan S
 * @date  09-01-2022
 * @description This function return decrypted item for given encryption
 * @param {String} encrypted
 */
export let decryptedData = (encrypted) => {
  try {
    const decipher = crypto.createDecipher("aes192", Config.SERVER.CIPER);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (err) {
    console.error(err);
    return null;
  }
};

/**
 * @author Murugan S
 * @date  09-01-2022
 * @description This function return decrypted item for given encryption using cryptojs
 * @param {String} encrypted
 */
export let encrypt = (textToConvert) => {
  return (conversionOutput = CryptoJS.AES.encrypt(
    textToConvert.trim(),
    password.trim()
  ).toString());
};

/**
 * @author Murugan S
 * @date  09-01-2022
 * @description This function return encrypted item for given string using cryptojs
 * @param {String} text
 */
export let decrypt = (textToConvert) => {
  return (conversionOutput = CryptoJS.AES.decrypt(
    textToConvert.trim(),
    password.trim()
  ).toString(CryptoJS.enc.Utf8));
};
