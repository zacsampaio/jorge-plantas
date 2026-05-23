const HTML_TAG_REGEX = /<[^>]*>/g;

export function stripHtml(value: string): string {
  return value.replace(HTML_TAG_REGEX, "");
}

export function sanitizeText(value: string): string {
  return stripHtml(value).trim();
}

export function sanitizeEmail(value: string): string {
  return sanitizeText(value).toLowerCase();
}

export function sanitizePhone(value: string): string {
  return sanitizeText(value).replace(/[^\d()+\-\s]/g, "");
}
