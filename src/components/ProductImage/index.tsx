import { useMemo, useState } from "react";
import {
  getLocalProductImageSrc,
  getProductImagePublicUrl,
} from "../../services/storage/productImageService";

const PLACEHOLDER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" fill="#e8f5e9"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#2e7d32" font-family="sans-serif" font-size="48">🌿</text>
    </svg>`
  );

interface ProductImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  name: string;
  imagePath?: string | null;
}

function buildImageCandidates(
  name: string,
  imagePath?: string | null
): string[] {
  const candidates: string[] = [];

  if (imagePath) {
    const storageUrl = getProductImagePublicUrl(imagePath);
    if (storageUrl) candidates.push(storageUrl);
  }

  candidates.push(getLocalProductImageSrc(name));
  candidates.push(PLACEHOLDER);

  return candidates;
}

export function ProductImage({
  name,
  imagePath,
  alt,
  onError,
  ...props
}: ProductImageProps) {
  const candidates = useMemo(
    () => buildImageCandidates(name, imagePath),
    [name, imagePath]
  );
  const [index, setIndex] = useState(0);

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setIndex((current) =>
      current < candidates.length - 1 ? current + 1 : current
    );
    onError?.(event);
  };

  return (
    <img
      {...props}
      src={candidates[index]}
      alt={alt ?? name}
      onError={handleError}
    />
  );
}
