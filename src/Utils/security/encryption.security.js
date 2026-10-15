import crypto from "crypto";
const ENCRYPTION_KEY = Buffer.from(`7e3b2c1d4e5f6g7h8i9j0k1l2m3n4o5p6`, 'hex'); 
const IV_LENGTH = 16;
export const encrypt = (plainText) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    console.log({iv});


    const cipherObject = crypto.createCipheriv('aes-256-cbc',ENCRYPTION_KEY , iv); 

    let cipherText = cipherObject.update(plainText, 'utf8', 'hex');

    cipherText += cipherObject.final('hex');
    return `${iv.toString('hex')}:${cipherText}`;
}

export const decrypt = (cipherText) => {
    const [iv , encryptedText] = cipherText.split(':');

    const decipherObject = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

    let decipherText = decipherObject.update(encryptedText, 'hex', 'utf8');

    decipherText += decipherObject.final('utf8');
    return decipherText;
}