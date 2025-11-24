import { View, Text } from 'react-native';
import convert from 'color-convert';
import ColorManager from 'service/colorManager';
import { ColorType } from 'data/colors';

type ColorPreviewProps = {
  color: string;
  nColors: number;
  type?: ColorType;
};

export default function ColorPreview({ color, nColors, type }: ColorPreviewProps) {
  const closestColors = ColorManager.getNClosestColors(color, nColors, type);
  const hexs = closestColors.map((c) => '#' + convert.rgb.hex(c.rgb.R, c.rgb.G, c.rgb.B));
  const colorTypeShow = type === 'fio' ? 'linha' : 'fio';

  return (
    <View className="flex flex-col">
      <Text className="mb-2 mt-4 p-2 text-lg font-bold text-white">
        Cores de {type ? 'fio' : 'linha'} encontradas ({closestColors.length})
      </Text>
      {closestColors.map((closestColor, index) => (
        <View key={closestColor.code} className="mt-2 flex flex-col gap-3">
          {/* HEX */}
          <View className="p-2" style={{ backgroundColor: color }}>
            <Text className="text-white">
              Cor encontrada (hex): <Text>{color}</Text>
            </Text>
          </View>

          {/* HEX */}
          <View className="p-2" style={{ backgroundColor: hexs[index] }}>
            <Text className="text-white">
              Cor de {colorTypeShow} mais próxima (hex): <Text>{hexs[index]}</Text>
            </Text>
          </View>

          {/* Name */}
          {closestColor.name && (
            <View>
              <Text className="text-white">
                Nome: <Text>{closestColor.name}</Text>
              </Text>
            </View>
          )}

          {/* Code */}
          <View className="p-2">
            <Text className="text-white">
              Código da cor de {colorTypeShow} mais próxima: <Text>{closestColor.code}</Text>
            </Text>
          </View>

          {/* Compatibility Code */}
          {closestColor.compatibilityCode && (
            <View className="p-2">
              <Text className="text-white">
                Código de compatibilidade ({colorTypeShow}):{' '}
                <Text>{closestColor.compatibilityCode}</Text>
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
