import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigator from './Navigators/RootNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <RootNavigator/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;