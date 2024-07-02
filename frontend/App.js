import { StatusBar } from 'expo-status-bar';
import Router from './navigation/Router';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Router />
      <Toast />
    </>
  );
}
