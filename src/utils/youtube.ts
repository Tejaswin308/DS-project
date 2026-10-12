/**
 * Convert various YouTube URL formats to embed URL.
 * Supports:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 */
export function toYouTubeEmbedUrl(url: string): string | null {
  if (!url || !url.trim()) return null;
  try {
    const trimmed = url.trim();

    // Already an embed URL
    if (trimmed.includes('youtube.com/embed/')) {
      return trimmed;
    }

    // youtu.be short URL
    const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    // youtube.com/watch?v=
    const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

export function isValidYouTubeUrl(url: string): boolean {
  return toYouTubeEmbedUrl(url) !== null;
}
