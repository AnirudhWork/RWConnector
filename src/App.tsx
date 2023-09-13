import { SafeAreaView, StyleSheet } from 'react-native';
import RootNavigator from './Navigators/RootNavigator';
import AuthProvider from './Components/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
} );

export default App;
