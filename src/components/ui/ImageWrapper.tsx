import Image, { type ImageProps } from "next/image";
import { cn, optimizeCloudinaryUrl } from "@/lib/utils";

export type ImageAspectRatio =
  | "1/1"
  | "4/5"
  | "16/9"
  | "3/4"
  | "436/436"
  | "436/427"
  | "auto";

export type ImageCornerRadius = "none" | "md" | "lg" | "pill";

export interface ImageWrapperProps extends Omit<ImageProps, "className"> {
  aspectRatio?: ImageAspectRatio;
  radius?: ImageCornerRadius;
  className?: string;
  imageClassName?: string;
  fallbackText?: string;
}

const aspectRatioStyles: Record<ImageAspectRatio, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-video",
  "3/4": "aspect-[3/4]",
  "436/436": "aspect-[436/436]",
  "436/427": "aspect-[436/427]",
  auto: "",
};

const radiusStyles: Record<ImageCornerRadius, string> = {
  none: "rounded-none",
  md: "rounded-[var(--radius-card-md)]", // 10px
  lg: "rounded-[var(--radius-card-lg)]", // 20px
  pill: "rounded-[var(--radius-pill)]", // 300px
};

/**
 * Image foundation primitive wrapping Next.js Image.
 * Enforces aspect ratio retention, prevents CLS, handles object-fit/position,
 * and standardizes corner radii according to Phase 0 specifications.
 */
export function ImageWrapper({
  src,
  alt,
  aspectRatio = "auto",
  radius = "none",
  fill,
  width,
  height,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...rest
}: ImageWrapperProps) {
  const isFilled = fill || (aspectRatio !== "auto" && !width && !height);
  const resolvedSrc =
    typeof src === "string"
      ? optimizeCloudinaryUrl(src, {
          width: typeof width === "number" ? width : 1200,
          quality: "auto",
        })
      : src;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--color-blush)]/20",
        aspectRatioStyles[aspectRatio],
        radiusStyles[radius],
        className
      )}
    >
      {isFilled ? (
        <Image
          src={resolvedSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover object-center",
            radiusStyles[radius],
            imageClassName
          )}
          {...rest}
        />
      ) : (
        <Image
          src={resolvedSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={cn(
            "h-auto w-full object-cover object-center",
            radiusStyles[radius],
            imageClassName
          )}
          {...rest}
        />
      )}
    </div>
  );
}
