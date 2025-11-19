import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Text, Button } from 'react-native';
import CameraOverlay from './CameraOverlay';
import ImagePreview from './ImagePreview';
import getMainColor from 'utils/getMainColor';
import { useRef, useState } from 'react';
import { ImageManipulator } from 'expo-image-manipulator';
import ColorPreview from './ColorPreview';

const TARGET_SIZE = 10;

export default function CameraColorExtractor() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState<string | null>(null);
  const [mainColor, setMainColor] = useState<string | null>();

  const captureColor = async () => {
    if (!cameraRef.current) return;

    // Take picture
    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });

    setPreview(photo.uri);

    // Crop image
    const centerX = (photo.width - TARGET_SIZE) / 2;
    const centerY = (photo.height - TARGET_SIZE) / 2;

    const imageCtx = ImageManipulator.manipulate(photo.uri).crop({
      originX: centerX,
      originY: centerY,
      width: TARGET_SIZE,
      height: TARGET_SIZE,
    });
    const croppedImg = await imageCtx.renderAsync();
    const resultImg = await croppedImg.saveAsync({
      base64: true,
    });

    const foundColor = await getMainColor('data:image/jpg;base64,' + resultImg.base64);
    setMainColor(foundColor);
  };

  const reset = () => {
    setPreview(null);
    setMainColor(null);
  };

  if (!permission) return <View></View>;

  if (!permission.granted) {
    return (
      <View>
        <Text>Precisamos de acesso à câmera</Text>
        <Button title="Permitir" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View className="flex justify-center">
      {!preview && (
        <View className="relative flex h-[100%] justify-end bg-blue-500">
          <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" flash="auto" />
          <CameraOverlay width={TARGET_SIZE} height={TARGET_SIZE} />
          <Button title="Pegar cor" onPress={captureColor} />
        </View>
      )}

      {preview && (
        <View className="flex-col gap-2">
          <ImagePreview uri={preview} />
          <Button title="Tirar novamente" onPress={reset} />
        </View>
      )}

      {mainColor && (
        <View>
          <ColorPreview color={mainColor} />
        </View>
      )}
    </View>
  );
}
