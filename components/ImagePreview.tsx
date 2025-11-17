import { Image } from 'react-native';
import cn from 'utils/cn';

type ImagePreviewProps = {
  uri: string;
  width?: number;
  height?: number;
};

export default function ImagePreview({ uri, width, height }: ImagePreviewProps) {
  return <Image source={{ uri }} className={cn('h-32 w-32 border-2 border-emerald-500')} />;
}
