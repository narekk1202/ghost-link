const subtle = window.crypto.subtle;

export async function generateSymmetricKey() {
	const key = await subtle.generateKey(
		{
			name: 'AES-GCM',
			length: 256,
		},
		true,
		['encrypt', 'decrypt']
	);
	return key;
}

export async function encryptData(key: CryptoKey, plainText: string) {
	const encodedText = new TextEncoder().encode(plainText);
	const iv = window.crypto.getRandomValues(new Uint8Array(12));

	const cipherText = await subtle.encrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		encodedText
	);

	return { cipherText, iv };
}

export async function decryptData(
	key: CryptoKey,
	cipherText: ArrayBuffer,
	iv: ArrayBuffer
) {
	const decryptedData = await subtle.decrypt(
		{
			name: 'AES-GCM',
			iv,
		},
		key,
		cipherText
	);

	const decryptedText = new TextDecoder().decode(decryptedData);

	return decryptedText;
}

export const exportKeyToBase64 = async (key: CryptoKey) => {
	const rawKey = await subtle.exportKey('raw', key);
	const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
	return base64Key;
};

export const bufferToBase64 = (buf: ArrayBuffer | Uint8Array<ArrayBuffer>) =>
	btoa(String.fromCharCode(...new Uint8Array(buf)));

export const base64ToBuffer = (base64: string) => {
	const binaryString = atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
};

export const importKeyFromBase64 = async (base64Key: string) => {
	const binaryString = atob(base64Key);
	const keyBuffer = new Uint8Array(
		[...binaryString].map(char => char.charCodeAt(0))
	).buffer;

	const key = await subtle.importKey(
		'raw',
		keyBuffer,
		{
			name: 'AES-GCM',
		},
		true,
		['encrypt', 'decrypt']
	);

	return key;
};
