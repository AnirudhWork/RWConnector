import {StyleSheet, View, Modal, Animated, Image} from 'react-native';
import {LoadingProps} from './types';

const Loading: React.FC<LoadingProps> = ({visible}) => {
  const loadingImage = require('../Assets/Images/loader.gif');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
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

const styles = StyleSheet.create({
  refreshGifContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  refreshImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
