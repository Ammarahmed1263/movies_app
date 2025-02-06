import { ImageSourcePropType } from "react-native";
import { IMAGE_BASE_URL } from "../constants";

export enum ImageSize {
  SMALL = 'w200',
  MEDIUM = 'w500',
  LARGE = 'w780',
  ORIGINAL = 'original',
}

export default function getImageUrl(path: string | undefined | null, size: ImageSize = ImageSize.ORIGINAL) {
  return (path ? {uri: `${IMAGE_BASE_URL}${size}${path}`} : undefined);
};