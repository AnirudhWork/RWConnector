import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigator from './Navigators/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import GlobalContextProvider from './Components/GlobalContextProvider';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <GlobalContextProvider>
          <RootNavigator />
        </GlobalContextProvider>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
