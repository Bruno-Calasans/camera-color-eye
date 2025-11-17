import { View, Text } from 'react-native';

type ColorPreviewProps = {
  color: string;
};

export default function ColorPreview({ color }: ColorPreviewProps) {
  return (
    <View
      style={{
        backgroundColor: color,
      }}
      className="mt-2 items-center p-2">
      <Text className="font-bold text-white">
        Cor encontrada: <Text>{color}</Text>
      </Text>
    </View>
  );
}
