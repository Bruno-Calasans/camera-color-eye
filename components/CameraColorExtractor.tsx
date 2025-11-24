import { CameraView, useCameraPermissions } from 'expo-camera';
import { View, Text, Button } from 'react-native';
import CameraOverlay from './CameraOverlay';
import ImagePreview from './ImagePreview';
import getMainColor from 'utils/getMainColor';
import { useRef, useState } from 'react';
import { ImageManipulator } from 'expo-image-manipulator';
import ColorPreview from './ColorPreview';

const TARGET_SIZE = 20;

function DrawCropOverlay({ info }: any) {
  const { imgW, imgH, originX, originY, cropSize } = info;

  return (
    <View
      style={{
        position: 'absolute',
        top: `${(originY / imgH) * 100}%`,
        left: `${(originX / imgW) * 100}%`,
        width: `${(cropSize / imgW) * 100}%`,
        height: `${(cropSize / imgH) * 100}%`,
        borderWidth: 2,
        borderColor: 'red',
      }}
      pointerEvents="none"
    />
  );
}

export default function CameraColorExtractor() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [preview, setPreview] = useState<string | null>(null);
  const [croppedImg, setCroppedImg] = useState<string | null>(null);
  const [mainColor, setMainColor] = useState<string | null>();
  const [overlayInfo, setOverlayInfo] = useState<any>(null);

  const captureColor = async () => {
    if (!cameraRef.current) return;

    // Take picture
    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
      skipProcessing: true,
      shutterSound: true,
      isImageMirror: false,
    });

    setPreview(photo.uri);

    // Crop image
    const originX = (photo.width - TARGET_SIZE) / 2;
    const originY = (photo.height - TARGET_SIZE) / 2;

    const imageCtx = ImageManipulator.manipulate(photo.uri).crop({
      originX,
      originY,
      width: TARGET_SIZE,
      height: TARGET_SIZE,
    });
    const croppedImg = await imageCtx.renderAsync();
    const resultImg = await croppedImg.saveAsync({
      base64: true,
      compress: 1,
    });
    setCroppedImg(resultImg.uri);

    // find color from cropped image
    const foundColor = await getMainColor('data:image/jpg;base64,' + resultImg.base64);
    setMainColor(foundColor);

    setOverlayInfo({
      imgW: photo.width,
      imgH: photo.height,
      originX,
      originY,
      cropSize: TARGET_SIZE,
    });
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
        <View className="relative flex h-full w-full justify-end">
          <CameraView
            ref={cameraRef}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            facing="back"
            flash="auto"
            // videoStabilizationMode="auto"
            ratio="4:3"
          />

          <CameraOverlay width={TARGET_SIZE} height={TARGET_SIZE} />
          <Button title="Pegar cor" onPress={captureColor} />
        </View>
      )}

      {preview && croppedImg && (
        <View>
          <View className="flex flex-col gap-2">
            <ImagePreview uri={preview} />
            {overlayInfo && <DrawCropOverlay info={overlayInfo} />}
          </View>

          <View className="flex flex-col gap-2">
            <ImagePreview uri={croppedImg} />
          </View>

          <Button title="Tirar novamente" onPress={reset} />
        </View>
      )}

      {mainColor && <ColorPreview color={mainColor} nColors={1} />}
    </View>
  );
}
