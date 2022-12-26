import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'encryptlong'

const rsa= {
    // rsa front end
    mePublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtfa4T8xDHdhKZwKRYdUkgs4gaKb+j8XQBT0rmvUKDg7J+UPa/ijTByDDFflKWP0Z2NyI/fpgPONHfZkW0YBmmJIxVcF+8T9kyDJ+Tio7AybLaDVuu0YUww3NqlwfQoh19wfY5A8Ms0nJLJgq2LSWdxYwR4OYmvDRaeBYuXpDJ7QIDAQAB",
    mePrivateKey:"MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAO19rhPzEMd2EpnApFh1SSCziBopv6PxdAFPSua9QoODsn5Q9r+KNMHIMMV+UpY/RnY3Ij9+mA840d9mRbRgGaYkjFVwX7xP2TIMn5OKjsDJstoNW67RhTDDc2qXB9CiHX3B9jkDwyzScksmCrYtJZ3FjBHg5ia8NFp4Fi5ekMntAgMBAAECgYAU8RcvlShunj/HpRAY6Ma5BnvC6tmGSF1VXDubmybJWAyeTN9lRneeetuqHpiDvTKma/guJyibdwQysd8Fp8+7Bk+dIfcdiW7ICtJGB/7B3sdb7FwOWzleOEJbqevBwp1qiWIu6BsPezzyb5iBoqMZkqDKFMx6/RxvEI68Uob1YQJBAP1VZLFnpyduYO8dJehr++sl5gZ+R7+nV6gXeWxueE/W3VM4ZuaOUNWgJACGIKLthifyAqp+rIvI7ChL5Hjj/UkCQQDv/ZlGgs2A0pY3UkhSfy5okvJbHwVhLDyHYI1wQvo3HPrEBzXRGnnPLLaPe2d2m0+qQUxoIFf28i25oLKmq5uFAkEAguTKYDeUUHVhtGq1GYAh6//q+FPrMoV+byWh4Xq6w1XbiZJM6LeD4L0bnQGwfz6G4MDUy88jzB4Gl1OPOz9hsQJBAMRL9OQUt0yIcy/60IcR2f7VOwDHRdouma/NjMLnNcyAmqhekWlgs4N+ujBwKrd739SNppaA5hJqEnaD97yWHxUCQQDNLfl6yT00n73twT08UqK+nQFnubwklND6LiXZ/cPY5FR1ueYvC3CvT+yOQfhV4kLUUmuPHxj0NhR6T9H+4cge",
    // rsa backend
    backPublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDtfa4T8xDHdhKZwKRYdUkgs4gaKb+j8XQBT0rmvUKDg7J+UPa/ijTByDDFflKWP0Z2NyI/fpgPONHfZkW0YBmmJIxVcF+8T9kyDJ+Tio7AybLaDVuu0YUww3NqlwfQoh19wfY5A8Ms0nJLJgq2LSWdxYwR4OYmvDRaeBYuXpDJ7QIDAQAB"
}

const aes= {
    iv: "magicdu23souniub",
    key:"",
    encodeKey:""
}


   // aes encode
   export  function aesEncode(content,aesKey){
    let iv = CryptoJS.enc.Utf8.parse(aes.iv);
    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
    let encrypted = CryptoJS.AES.encrypt(content, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return  encrypted.toString();
}

// aes decode
export function aesDecode(encrypted,aesKey){
    //console.log(aes.iv)
    let iv = CryptoJS.enc.Utf8.parse(aes.iv);
    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
    var decrypted = CryptoJS.AES.decrypt(encrypted, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // convert to  utf8 string
    return CryptoJS.enc.Utf8.stringify(decrypted);
}

// rsa encrypt
export function rsaEncode(content){
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + rsa.backPublicKey + '-----END PUBLIC KEY-----');
    return encrypt.encryptLong(content);
}

// rsa decode
export function rsaDecode(content){
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(rsa.mePrivateKey);
    return encrypt.decryptLong(content);
}

//random aes key
export function generateKey(){
    return CryptoJS.lib.WordArray.random(128/8).toString();
}
