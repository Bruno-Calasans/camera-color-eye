import { View, Text } from 'react-native';
import convert from 'color-convert';
import ColorManager from 'service/colorManager';

type ColorPreviewProps = {
  color: string;
};

export default function ColorPreview({ color }: ColorPreviewProps) {
  console.log(ColorManager.getClosestColor(color).code);
  console.log(ColorManager.getNClosestColors(color, 2).map((c) => c.code));

  return (
    <View
      style={{
        backgroundColor: color,
      }}
      className="mt-2 flex flex-col items-center gap-2 p-2">
      <Text className="text-white">
        Cor encontrada HEX: <Text>{color}</Text>
      </Text>
      <Text className="text-white">
        Cor encontrada RGB: <Text>{convert.hex.rgb(color)}</Text>
      </Text>
      {/* <Text className="text-white">
        Cor mais próxima: <Text>{C}</Text>
      </Text> */}
    </View>
  );
}
