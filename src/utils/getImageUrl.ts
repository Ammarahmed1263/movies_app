import { IMAGE_BASE_URL } from "../constants";

enum ImageSize {
  SMALL = 'w200',
  MEDIUM = 'w500',
  LARGE = 'w780',
  ORIGINAL = 'original',
}

export default function getImageUrl(path: string, size: ImageSize = ImageSize.ORIGINAL) {
  return path ? `${IMAGE_BASE_URL}${size}${path}` : null;
};