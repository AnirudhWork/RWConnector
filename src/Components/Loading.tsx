import { StyleSheet, View, Modal, Animated, Image } from 'react-native';
import { LoadingProps } from './types';

const Loading: React.FC<LoadingProps> = ( { visible } ) => {
  const loadingImage = require( '../Assets/Images/loader.gif' );
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => { }}>
      <View style={styles.refreshGifContainer}>
        <Animated.Image
          source={loadingImage}
          resizeMode={'center'}
          style={styles.refreshImage}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create( {
  refreshGifContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  refreshImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
  },
} );

export default Loading;
