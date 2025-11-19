import CameraColorExtractor from 'components/CameraColorExtractor';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView>
      <CameraColorExtractor />
    </SafeAreaView>
  );
}
