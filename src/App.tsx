import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigator from './Navigators/RootNavigator';
import AuthProvider from './Components/AuthProvider';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
