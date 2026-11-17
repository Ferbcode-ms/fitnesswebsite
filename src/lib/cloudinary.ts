import { v2 as cloudinary } from "cloudinary";

// Server-side initialization
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Checks if Cloudinary credentials are fully configured.
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_CLOUD_NAME !== "your_cloud_name"
  );
}

/**
 * Generates an authentication signature for direct signed client-to-Cloudinary uploads.
 * This guarantees the API Secret never touches the browser.
 */
export function generateUploadSignature(paramsToSign: Record<string, string | number>) {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error("CLOUDINARY_API_SECRET is not configured");
  }

  // Cloudinary signature calculation
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  return {
    signature,
    timestamp: paramsToSign.timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  };
}

/**
 * Generates an optimized Cloudinary delivery URL with automatic format and quality.
 * Handles both public IDs and full Cloudinary URLs safely without URL corruption.
 */
export function getOptimizedImageUrl(
  publicIdOrUrl: string,
  options?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
  }
): string {
  if (!publicIdOrUrl) return "";

  // If local static image (e.g. /images/hero-coaching.jpg), return as is
  if (publicIdOrUrl.startsWith("/")) {
    return publicIdOrUrl;
  }

  // If non-Cloudinary external URL, return as is
  if (publicIdOrUrl.startsWith("http") && !publicIdOrUrl.includes("res.cloudinary.com")) {
    return publicIdOrUrl;
  }

  const { width, height, crop = "fill", quality = "auto" } = options || {};

  // If already a full Cloudinary URL, inject transformations after /upload/
  if (publicIdOrUrl.includes("res.cloudinary.com/")) {
    const uploadIndex = publicIdOrUrl.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const transformParts: string[] = ["f_auto", `q_${quality}`];
      if (width) transformParts.push(`w_${width}`);
      if (height) transformParts.push(`h_${height}`);
      if (crop) transformParts.push(`c_${crop}`);
      const transformStr = transformParts.join(",");

      const prefix = publicIdOrUrl.substring(0, uploadIndex + 8);
      const rest = publicIdOrUrl.substring(uploadIndex + 8);

      // If transformations already exist in the URL, avoid duplicate injection
      if (rest.startsWith("f_auto") || rest.startsWith("q_auto")) {
        return publicIdOrUrl;
      }
      return `${prefix}${transformStr}/${rest}`;
    }
    return publicIdOrUrl;
  }

  // Otherwise, it's a raw public ID
  return cloudinary.url(publicIdOrUrl, {
    transformation: [
      {
        width,
        height,
        crop,
        quality,
        fetch_format: "auto",
      },
    ],
    secure: true,
  });
}
