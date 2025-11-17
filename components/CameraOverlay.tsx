/* eslint-disable no-unused-expressions */
import { View } from 'react-native';
import cn from 'utils/cn';

type CameraOverlayProps = {
  width: number;
  height: number;
};

export default function CameraOverlay({ width, height }: CameraOverlayProps) {
  return (
    <View className="absolute inset-0 items-center justify-center" pointerEvents="none">
      <View
        style={{
          width,
          height,
          borderWidth: 2,
          borderColor: '#10b981', // emerald-500,
          borderRadius: 100,
        }}
      />
    </View>
  );
}
