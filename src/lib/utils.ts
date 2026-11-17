/**
 * Joins conditional CSS class names without introducing external runtime overhead.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Automatically injects Cloudinary transformations (format auto, quality auto, optional width/height)
 * into remote Cloudinary delivery URLs to eliminate massive raw PNG/JPEG downloads.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  options?: { width?: number; height?: number; crop?: string; quality?: string | number }
): string {
  if (!url || typeof url !== "string") return "";
  if (!url.includes("res.cloudinary.com/")) return url;

  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const rest = url.substring(uploadIndex + 8);
  // Avoid duplicate injection
  if (rest.startsWith("f_auto") || rest.startsWith("q_auto")) {
    return url;
  }

  const { width, height, crop = "fill", quality = "auto" } = options || {};
  const parts: string[] = ["f_auto", `q_${quality}`];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (crop && (width || height)) parts.push(`c_${crop}`);

  const prefix = url.substring(0, uploadIndex + 8);
  return `${prefix}${parts.join(",")}/${rest}`;
}

/**
 * Sanitizes and normalizes a phone number to digits for WhatsApp (wa.me) links.
 * Handles numbers with +country code, numbers with leading 0 (e.g. India 062834...),
 * and 10-digit mobiles.
 */
export function formatPhoneForWhatsApp(phone: string | null | undefined): string {
  if (!phone || typeof phone !== "string") return "";

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");

  // If provided with explicit international plus (+91..., +1...), keep stripped digits
  if (trimmed.startsWith("+")) {
    return digits;
  }

  // 11 digits starting with 0 (e.g. Indian mobile dialed with 0 prefix like 06283453884)
  if (digits.length === 11 && digits.startsWith("0")) {
    const next = digits[1];
    if (["6", "7", "8", "9"].includes(next)) {
      return "91" + digits.slice(1);
    }
    return digits.slice(1);
  }

  // 10 digits starting with 6, 7, 8, 9 (standard Indian mobile without country code)
  if (digits.length === 10 && ["6", "7", "8", "9"].includes(digits[0])) {
    return "91" + digits;
  }

  // 10 digits US/Canada
  if (digits.length === 10 && !digits.startsWith("1")) {
    return "1" + digits;
  }

  return digits;
}


