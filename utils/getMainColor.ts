import { getColors } from 'react-native-image-colors';

export default async function getMainColor(uri: string) {
  const colorResult = await getColors(uri, {
    cache: true,
    key: uri,
    quality: 'highest',
  });

  if (colorResult.platform === 'android' || colorResult.platform === 'web') {
    return colorResult.dominant;
  } else {
    return colorResult.primary;
  }
}
