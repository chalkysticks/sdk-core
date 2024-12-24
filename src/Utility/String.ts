/**
 * @param string str
 * @return string
 */
export function basicHash(input: string): string {
	return input
		.split('')
		.reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0)
		.toString();
}

/**
 * @param string str
 * @return string
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Break paragraph into chunks of sentences at least 50 characters or more
 *
 * @param string paragraph
 * @param number chunkSize
 * @return string[]
 */
export function chunkSentences(paragraph: string, chunkSize: number = 130): string[] {
	const sentences: string[] = paragraph.replace(/\.$/, '').split('. ');
	const chunks: string[] = [];

	sentences.forEach((sentence: string) => {
		if (chunks.length === 0 || chunks[chunks.length - 1].length > chunkSize) {
			chunks.push(sentence + '.');
		} else {
			sentence = sentence.trim();

			chunks[chunks.length - 1] += ` ${sentence}.`;
		}
	});

	return chunks;
}

/**
 * Basic MD5 hash implementation
 *
 * @param str The input string to hash
 * @return string The MD5 hash as a hex string
 */
export function md5(str: string): string {
	const hexChars = '0123456789abcdef';
	const utf8Encode = new TextEncoder().encode(str);

	// Pad the message to ensure length is congruent to 448 mod 512
	const originalLengthBits = utf8Encode.length * 8;
	const paddingLength = (448 - ((utf8Encode.length * 8 + 1) % 512) + 512) % 512;
	const paddedLength = utf8Encode.length + Math.ceil(paddingLength / 8) + 8;

	// Create padded array
	const paddedArray = new Uint8Array(paddedLength);
	paddedArray.set(utf8Encode);
	paddedArray[utf8Encode.length] = 0x80; // Add 1 bit followed by zeros

	// Add original length in bits as little-endian 64-bit number
	const view = new DataView(paddedArray.buffer);
	view.setUint32(paddedLength - 8, originalLengthBits >>> 0, true);
	view.setUint32(paddedLength - 4, Math.floor(originalLengthBits / 0x100000000), true);

	// Now we can safely create Uint32Array as the length is guaranteed to be multiple of 4
	const words = new Uint32Array(paddedLength / 4);
	for (let i = 0; i < paddedLength; i += 4) {
		words[i / 4] = view.getUint32(i, true);
	}

	// Initialize hash state
	let a = 0x67452301;
	let b = 0xefcdab89;
	let c = 0x98badcfe;
	let d = 0x10325476;

	// Helper functions
	function rotateLeft(x: number, n: number): number {
		return (x << n) | (x >>> (32 - n));
	}

	function F(x: number, y: number, z: number): number {
		return (x & y) | (~x & z);
	}

	function G(x: number, y: number, z: number): number {
		return (x & z) | (y & ~z);
	}

	function H(x: number, y: number, z: number): number {
		return x ^ y ^ z;
	}

	function I(x: number, y: number, z: number): number {
		return y ^ (x | ~z);
	}

	// Process each 512-bit chunk
	for (let i = 0; i < words.length; i += 16) {
		const chunk = words.slice(i, i + 16);
		let [aa, bb, cc, dd] = [a, b, c, d];

		// Round 1
		a = rotateLeft(a + F(b, c, d) + chunk[0] + 0xd76aa478, 7) + b;
		d = rotateLeft(d + F(a, b, c) + chunk[1] + 0xe8c7b756, 12) + a;
		c = rotateLeft(c + F(d, a, b) + chunk[2] + 0x242070db, 17) + d;
		b = rotateLeft(b + F(c, d, a) + chunk[3] + 0xc1bdceee, 22) + c;

		a = rotateLeft(a + F(b, c, d) + chunk[4] + 0xf57c0faf, 7) + b;
		d = rotateLeft(d + F(a, b, c) + chunk[5] + 0x4787c62a, 12) + a;
		c = rotateLeft(c + F(d, a, b) + chunk[6] + 0xa8304613, 17) + d;
		b = rotateLeft(b + F(c, d, a) + chunk[7] + 0xfd469501, 22) + c;

		a = rotateLeft(a + F(b, c, d) + chunk[8] + 0x698098d8, 7) + b;
		d = rotateLeft(d + F(a, b, c) + chunk[9] + 0x8b44f7af, 12) + a;
		c = rotateLeft(c + F(d, a, b) + chunk[10] + 0xffff5bb1, 17) + d;
		b = rotateLeft(b + F(c, d, a) + chunk[11] + 0x895cd7be, 22) + c;

		a = rotateLeft(a + F(b, c, d) + chunk[12] + 0x6b901122, 7) + b;
		d = rotateLeft(d + F(a, b, c) + chunk[13] + 0xfd987193, 12) + a;
		c = rotateLeft(c + F(d, a, b) + chunk[14] + 0xa679438e, 17) + d;
		b = rotateLeft(b + F(c, d, a) + chunk[15] + 0x49b40821, 22) + c;

		// Round 2
		a = rotateLeft(a + G(b, c, d) + chunk[1] + 0xf61e2562, 5) + b;
		d = rotateLeft(d + G(a, b, c) + chunk[6] + 0xc040b340, 9) + a;
		c = rotateLeft(c + G(d, a, b) + chunk[11] + 0x265e5a51, 14) + d;
		b = rotateLeft(b + G(c, d, a) + chunk[0] + 0xe9b6c7aa, 20) + c;

		a = rotateLeft(a + G(b, c, d) + chunk[5] + 0xd62f105d, 5) + b;
		d = rotateLeft(d + G(a, b, c) + chunk[10] + 0x02441453, 9) + a;
		c = rotateLeft(c + G(d, a, b) + chunk[15] + 0xd8a1e681, 14) + d;
		b = rotateLeft(b + G(c, d, a) + chunk[4] + 0xe7d3fbc8, 20) + c;

		a = rotateLeft(a + G(b, c, d) + chunk[9] + 0x21e1cde6, 5) + b;
		d = rotateLeft(d + G(a, b, c) + chunk[14] + 0xc33707d6, 9) + a;
		c = rotateLeft(c + G(d, a, b) + chunk[3] + 0xf4d50d87, 14) + d;
		b = rotateLeft(b + G(c, d, a) + chunk[8] + 0x455a14ed, 20) + c;

		a = rotateLeft(a + G(b, c, d) + chunk[13] + 0xa9e3e905, 5) + b;
		d = rotateLeft(d + G(a, b, c) + chunk[2] + 0xfcefa3f8, 9) + a;
		c = rotateLeft(c + G(d, a, b) + chunk[7] + 0x676f02d9, 14) + d;
		b = rotateLeft(b + G(c, d, a) + chunk[12] + 0x8d2a4c8a, 20) + c;

		// Round 3
		a = rotateLeft(a + H(b, c, d) + chunk[5] + 0xfffa3942, 4) + b;
		d = rotateLeft(d + H(a, b, c) + chunk[8] + 0x8771f681, 11) + a;
		c = rotateLeft(c + H(d, a, b) + chunk[11] + 0x6d9d6122, 16) + d;
		b = rotateLeft(b + H(c, d, a) + chunk[14] + 0xfde5380c, 23) + c;

		a = rotateLeft(a + H(b, c, d) + chunk[1] + 0xa4beea44, 4) + b;
		d = rotateLeft(d + H(a, b, c) + chunk[4] + 0x4bdecfa9, 11) + a;
		c = rotateLeft(c + H(d, a, b) + chunk[7] + 0xf6bb4b60, 16) + d;
		b = rotateLeft(b + H(c, d, a) + chunk[10] + 0xbebfbc70, 23) + c;

		a = rotateLeft(a + H(b, c, d) + chunk[13] + 0x289b7ec6, 4) + b;
		d = rotateLeft(d + H(a, b, c) + chunk[0] + 0xeaa127fa, 11) + a;
		c = rotateLeft(c + H(d, a, b) + chunk[3] + 0xd4ef3085, 16) + d;
		b = rotateLeft(b + H(c, d, a) + chunk[6] + 0x04881d05, 23) + c;

		a = rotateLeft(a + H(b, c, d) + chunk[9] + 0xd9d4d039, 4) + b;
		d = rotateLeft(d + H(a, b, c) + chunk[12] + 0xe6db99e5, 11) + a;
		c = rotateLeft(c + H(d, a, b) + chunk[15] + 0x1fa27cf8, 16) + d;
		b = rotateLeft(b + H(c, d, a) + chunk[2] + 0xc4ac5665, 23) + c;

		// Round 4
		a = rotateLeft(a + I(b, c, d) + chunk[0] + 0xf4292244, 6) + b;
		d = rotateLeft(d + I(a, b, c) + chunk[7] + 0x432aff97, 10) + a;
		c = rotateLeft(c + I(d, a, b) + chunk[14] + 0xab9423a7, 15) + d;
		b = rotateLeft(b + I(c, d, a) + chunk[5] + 0xfc93a039, 21) + c;

		a = rotateLeft(a + I(b, c, d) + chunk[12] + 0x655b59c3, 6) + b;
		d = rotateLeft(d + I(a, b, c) + chunk[3] + 0x8f0ccc92, 10) + a;
		c = rotateLeft(c + I(d, a, b) + chunk[10] + 0xffeff47d, 15) + d;
		b = rotateLeft(b + I(c, d, a) + chunk[1] + 0x85845dd1, 21) + c;

		a = rotateLeft(a + I(b, c, d) + chunk[8] + 0x6fa87e4f, 6) + b;
		d = rotateLeft(d + I(a, b, c) + chunk[15] + 0xfe2ce6e0, 10) + a;
		c = rotateLeft(c + I(d, a, b) + chunk[6] + 0xa3014314, 15) + d;
		b = rotateLeft(b + I(c, d, a) + chunk[13] + 0x4e0811a1, 21) + c;

		a = rotateLeft(a + I(b, c, d) + chunk[4] + 0xf7537e82, 6) + b;
		d = rotateLeft(d + I(a, b, c) + chunk[11] + 0xbd3af235, 10) + a;
		c = rotateLeft(c + I(d, a, b) + chunk[2] + 0x2ad7d2bb, 15) + d;
		b = rotateLeft(b + I(c, d, a) + chunk[9] + 0xeb86d391, 21) + c;

		// Add this chunk's hash to result
		a = (a + aa) >>> 0;
		b = (b + bb) >>> 0;
		c = (c + cc) >>> 0;
		d = (d + dd) >>> 0;
	}

	// Convert to hex string
	return [a, b, c, d]
		.map((n) => {
			return ('00000000' + n.toString(16)).slice(-8);
		})
		.join('');
}

/**
 * Generate a random string
 *
 * @return string
 */
export function random(length: number = 7): string {
	return Math.random().toString(36).substring(length);
}

/**
 * Shuffle an array of strings
 *
 * @param string[] strings
 * @return string[]
 */
export function shuffle(strings: string[]): string[] {
	const shuffled = strings.slice();

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}

/**
 * Turn string into a slug
 *
 * @param string str
 * @return string
 */
export function slug(input: string): string {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * @param string str
 * @param number length
 * @return string
 */
export function truncate(str: string, length: number = 30): string {
	return str.length > length ? str.slice(0, length).trim() + '...' : str;
}

/**
 * @param string paragraph
 * @param number targetCharacters
 * @return string
 */
export function trimSentences(paragraph: string, targetCharacters: number = 500): string {
	const periodIndex = paragraph.indexOf('.', targetCharacters);
	return paragraph.substr(0, periodIndex > 0 ? periodIndex + 1 : paragraph.length);
}
