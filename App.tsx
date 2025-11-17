import CameraColorExtractor from 'components/CameraColorExtractor';
import './global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <SafeAreaView>
      <CameraColorExtractor />
    </SafeAreaView>
  );
}
