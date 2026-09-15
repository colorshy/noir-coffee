/**
 * Resolves an asset path to be compatible with Vite's base path (e.g., /noir-coffee/ on GitHub Pages).
 * Correctly handles root-relative paths, absolute paths, and external URLs.
 */
export const assetUrl = (path: string): string => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Avoid duplicate base prefix if already prefixed
  if (cleanBase !== '/' && (cleanPath.startsWith(cleanBase.slice(1)) || path.startsWith(cleanBase))) {
    return path.startsWith('/') ? path : `/${path}`;
  }

  return `${cleanBase}${cleanPath}`;
};
