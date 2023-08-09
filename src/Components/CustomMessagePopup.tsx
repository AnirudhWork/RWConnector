import {StyleSheet, View, Modal, Text, TouchableOpacity} from 'react-native';
import {CustomMessagePopupProps} from './types';

const CustomMessagePopup: React.FC<CustomMessagePopupProps> = ({
  message,
  visible,
  setShowPopUp,
  setPopUpMessage,
}) => {
  const handleClearMessage = () => {
    setShowPopUp(false);
    setPopUpMessage('');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Text style={[styles.message, {textAlign: 'left'}]}>{message}</Text>
          </View>
          <TouchableOpacity
            onPress={handleClearMessage}
            style={styles.clearMessageButton}
            hitSlop={10}>
            <Text style={styles.clearMessageButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomMessagePopup;

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
  clearMessageButton: {
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  clearMessageButtonText: {
    color: '#8ab4f8',
    fontSize: 14,
    paddingVertical: 20,
  },
  message: {
    color: '#9aa0a6',
    fontSize: 14,
  },
});
