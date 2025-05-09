/**
 * Check if a URL is a YouTube URL.
 *
 * @param url The URL to check.
 * @return boolean
 */
export function isYouTube(url: string): boolean {
	return (url || '').match(/(?:youtube\.com|youtu\.be)/) !== null;
}

/**
 * Parse the video ID from a YouTube URL.
 *
 * @param url The YouTube URL.
 * @return string
 */
export function parseId(url: string): string {
	const id = (url || '').match(/(?:\?v=|\/embed\/|\/\d+\/|\.be\/)([a-zA-Z0-9_-]+)/);

	return id ? id[1] : '';
}

/**
 * Convert a YouTube URL to a thumbnail URL.
 *
 * @param url The YouTube URL.
 * @return string
 */
export function thumbnailUrl(url: string): string {
	const id = parseId(url);

	return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Convert a YouTube URL to an embed URL.
 *
 * @param url The YouTube URL.
 * @return string
 */
export function toEmbedUrl(url: string): string {
	const id = parseId(url);

	return `https://www.youtube.com/embed/${id}`;
}
