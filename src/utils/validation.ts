export function isValidUrl(url: string): boolean {
  if (!url || !url.trim()) return true; // empty is fine – URLs are optional
  try {
    const u = new URL(url.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidGitHubUrl(url: string): boolean {
  if (!url || !url.trim()) return true;
  try {
    const u = new URL(url.trim());
    return (
      (u.protocol === 'http:' || u.protocol === 'https:') &&
      u.hostname === 'github.com'
    );
  } catch {
    return false;
  }
}

export function validateImageFile(file: File): string | null {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return 'Please upload a JPEG, PNG, or WebP image.';
  }
  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    return `Image must be smaller than ${maxSizeMB}MB.`;
  }
  return null;
}

export interface ExperimentValidationErrors {
  title?: string;
  description?: string;
  number?: string;
  youtubeUrl?: string;
  githubUrl?: string;
}

export function validateExperimentForm(data: {
  title: string;
  description: string;
  number: number | string;
  youtubeUrl?: string;
  githubUrl?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required.';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required.';
  }

  const num = Number(data.number);
  if (!data.number || isNaN(num) || num < 1) {
    errors.number = 'A valid experiment number is required.';
  }

  if (data.youtubeUrl && !isValidUrl(data.youtubeUrl)) {
    errors.youtubeUrl = 'Please enter a valid YouTube URL.';
  }

  if (data.githubUrl && !isValidUrl(data.githubUrl)) {
    errors.githubUrl = 'Please enter a valid GitHub URL.';
  }

  return errors;
}
