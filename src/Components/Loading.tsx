import {StyleSheet, View, Modal, Image, ActivityIndicator} from 'react-native';
import {LoadingProps} from './types';

const Loading: React.FC<LoadingProps> = ({visible}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    width: '100%',
  },
  modalContent: {
    width: '70%',
    paddingTop: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: '#35373a',
  },
});
