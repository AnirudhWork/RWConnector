import { StyleSheet, View, Animated } from 'react-native';
import { globalStyles } from '../Utils/global-styles';

const Loading = () => {
  const loadingImage = require( '../Assets/Images/loader.gif' );
  return (
    // <Modal
    //   animationType="fade"
    //   transparent={true}
    //   visible={visible}
    //   onRequestClose={() => { }}>
    <View style={[styles.refreshGifContainer, globalStyles.absoluteStyle]}>
      <Animated.Image
        source={loadingImage}
        resizeMode={'center'}
        style={styles.refreshImage}
      />
    </View>
    // </Modal>
  );
};

const styles = StyleSheet.create( {
  refreshGifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 5,
  },
  refreshImage: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  header: {
    width: '100%',
  },
} );

export default Loading;
