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
	iv: ArrayBufferView<ArrayBuffer>
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
