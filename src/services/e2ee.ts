// Based on https://github.com/heudersena/supabase-e2ee-chat/blob/master/src/lib/e2e.ts
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

function decryptMessage(
    payload: string,
    keys: nacl.BoxKeyPair,
    nonce: Uint8Array
) {
    const messageBytes = util.decodeBase64(payload);
    const decryptedBytes = nacl.box.open(
        messageBytes,
        nonce,
        keys.publicKey,
        keys.secretKey
    );
    return decryptedBytes ? util.encodeUTF8(decryptedBytes) : null;
}

function encryptMessage(
    message: string,
    keys: nacl.BoxKeyPair,
    nonce: Uint8Array
) {
    const messageBytes = util.decodeUTF8(message);
    const encryptedBytes = nacl.box(
        messageBytes,
        nonce,
        keys.publicKey,
        keys.secretKey
    );
    return util.encodeBase64(encryptedBytes);
}

function genKeys() {
    return nacl.box.keyPair();
}

function genNonce() {
    return nacl.randomBytes(nacl.box.nonceLength);
}

function encryptJSON<T = any>(
    json: T,
    keys: nacl.BoxKeyPair,
    nonce: Uint8Array
) {
    return encryptMessage(JSON.stringify(json), keys, nonce);
}

function decryptJSON<T = any>(
    payload: string,
    keys: nacl.BoxKeyPair,
    nonce: Uint8Array
): T | null {
    console.log({ payload });
    const decrypted = decryptMessage(payload, keys, nonce);
    console.log({ decrypted });
    if (!decrypted) return null;
    try {
        return JSON.parse(decrypted);
    } catch {
        return null;
    }
}

export {
    encryptMessage,
    decryptMessage,
    genKeys,
    genNonce,
    encryptJSON,
    decryptJSON,
};
