//前后端定义的密钥，AES使用16位
import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'encryptlong'

const rsa= {
    // 自己的rsa公私钥
    mePublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCf0B4Al2wIuGK9Bj9Ao23siR2mMfkvdrxEGu2j0tNeA1LSyKOuw7FLmreRMYLCQMI4BTJNYsxUqvdS8IxFpD5hOx9mx6OqY2GQSIZq5a1lt3Rx4SpDiuuVGm7h5uuLN7bvMfaLBW3g4E5DAKapuZ/u5ULO+y2jczVXkaSb1IjNnwIDAQAB",
    mePrivateKey:"MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAJ/QHgCXbAi4Yr0GP0CjbeyJHaYx+S92vEQa7aPS014DUtLIo67DsUuat5ExgsJAwjgFMk1izFSq91LwjEWkPmE7H2bHo6pjYZBIhmrlrWW3dHHhKkOK65UabuHm64s3tu8x9osFbeDgTkMApqm5n+7lQs77LaNzNVeRpJvUiM2fAgMBAAECgYAq4FxcTkPm5wleq4Fm5zIDxxnUUA4J5PJH122wiUy6KWwcL0ZzCf/UR/M+Gil50oQJIaPITVyCzsfCUdVgjdtKL7x8e1dQwlI3/DLEat02Njj4fl6KsMq9EqLyleq0UdgYtevZOOoi+ZKXlqZjkM3yOsbwyu9u0D+s77KfHihwuQJBAODhWKTLywJwSXPC6CvlSoyCjscWgUadk8IN+ELyLq591DYFCQllYQPyMj8Cy0dY5OC9GvwRLZurs9LGi6C9d0UCQQC17a76RNHqmmGKsEEGIx3XIzvDrjSRmE3v+NLMcf+JUaUJiKmedDZeWnJuxIXVmFbHi2bzCb2NXUYqhuXsuJ2TAkBHxSO5VKEx4gxPOcFHYSJtva07tN8FXn0tza+SDiD/54C2zNyZdxWDYOTQX1/pIWHKqA/YqtLXf/EgL+WYI1/RAkAk+RwRgsECo8NlEzLz01kyKtfvicznNgPI3FHC+PwM5UncKSkHqeiOvmT5O/lTEnW4cg1HIVijjSxAYlACDvb/AkBmwlv6+gLoKpCU6h7+J6OxB9GKM2Hjs3Mh5tgXgveCwMg2Knz+RPIj92jq7CLm20xs2654yYnyHc4V+kzr3Zu1",
    // 后端的rsa公钥
    backPublicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJvCDW9GIBsiv9ma9r2btffIxQQHB98Pl1S2RV2PrQsK1O2yFSUf8P43l5EfAh+jiEn/k5egKEoeMRLdDZkt5afNgPYbNjiRFJP8NZTw4f3Yxp91+d04GGkeFcj59QIn/rqqHo2JLOESNae8IC1tKKQTqkwVIjLRwTIDcVmsq9NwIDAQAB"
}

const aes= {
    iv: "123456789abcdefh",
    key:"",
    encodeKey:""
}


   // aes 加密
   export  function aesEncode(content,iv,aesKey){
    iv = CryptoJS.enc.Utf8.parse(iv);
    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
    let encrypted = CryptoJS.AES.encrypt(content, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return  encrypted.toString();
}

// aes 解密
export function aesDecode(encrypted,aesKey){
    console.log(aes.iv)
    let iv = CryptoJS.enc.Utf8.parse(aes.iv);
    aesKey = CryptoJS.enc.Utf8.parse(aesKey);
    var decrypted = CryptoJS.AES.decrypt(encrypted, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 转换为 utf8 字符串
    return CryptoJS.enc.Utf8.stringify(decrypted);
}

// rsa 公钥加密
export function rsaEncode(publicKey,content){
    // 加密+base64
    const encrypt = new JSEncrypt();
    // 设置公钥
    encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + publicKey + '-----END PUBLIC KEY-----');
    return encrypt.encryptLong(content);
}

// rsa 私钥解密
export function rsaDecode(content){
    // 加密+base64
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(rsa.mePrivateKey);
    return encrypt.decryptLong(content);
}

//随机生成aes 密钥
export function generateKey(){
    return CryptoJS.lib.WordArray.random(128/8).toString();
}
