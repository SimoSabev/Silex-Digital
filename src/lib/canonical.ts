import { siteConfig } from '@/config/seo';

/**
 * Generate canonical URL for a given path
 * Handles trailing slashes and query parameters
 */
export function getCanonicalUrl(path = ''): string {
  const baseUrl = siteConfig.url;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove trailing slash if present (except for root)
  const normalizedPath = cleanPath === '' 
    ? '' 
    : cleanPath.endsWith('/') 
      ? cleanPath.slice(0, -1) 
      : cleanPath;
  
  // Construct full URL
  const url = normalizedPath 
    ? `${baseUrl}/${normalizedPath}`
    : baseUrl;
  
  return url;
}

/**
 * Generate alternate language URLs
 * Useful for hreflang tags
 */
export function getAlternateUrls(path = ''): Record<string, string> {
  const canonical = getCanonicalUrl(path);
  
  return {
    bg: canonical,
    en: canonical.replace('silex-digital.com', 'silex-digital.com/en'),
  };
}

/**
 * Check if a URL is internal to the site
 */
export function isInternalUrl(url: string): boolean {
  return url.startsWith(siteConfig.url) || url.startsWith('/');
}

/**
 * Sanitize URL by removing tracking parameters
 */
export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const paramsToRemove = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
    
    paramsToRemove.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    return urlObj.toString();
  } catch {
    return url;
  }
}
