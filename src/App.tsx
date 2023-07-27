import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigator from './Navigators/RootNavigator';

const App: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <RootNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
