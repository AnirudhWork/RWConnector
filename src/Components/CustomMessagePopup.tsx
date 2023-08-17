import {StyleSheet, View, Modal, Text, TouchableOpacity} from 'react-native';
import {CustomMessagePopupProps} from './types';

const CustomMessagePopup: React.FC<CustomMessagePopupProps> = ({
  message,
  visible,
  setShowPopUp,
  setPopUpMessage,
  onClearMessage,
  setConfirmLogOut,
}) => {
  const handleClearMessage = () => {
    setShowPopUp(false);
    if (message === 'Session Timed Out!' && onClearMessage) {
      setPopUpMessage('');
      onClearMessage();
    }
    if (setConfirmLogOut?.[0] && onClearMessage) {
      setShowPopUp(false);
      setConfirmLogOut[1](false);
      setPopUpMessage('');
      onClearMessage();
    }
    setPopUpMessage('');
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => handleClearMessage()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Text style={[styles.message, {textAlign: 'left'}]}>{message}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            {setConfirmLogOut && (
              <TouchableOpacity
                onPress={() => {
                  setShowPopUp(false);
                  setConfirmLogOut[1](false);
                  setPopUpMessage('');
                }}
                style={styles.clearMessageButton}
                hitSlop={10}>
                <Text style={styles.clearMessageButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleClearMessage}
              style={styles.clearMessageButton}
              hitSlop={10}>
              <Text style={styles.clearMessageButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 10,
    marginHorizontal: 2,
  },
  clearMessageButtonText: {
    color: '#8ab4f8',
    fontSize: 14,
    paddingVertical: 20,
  },
  message: {
    color: '#9aa0a6',
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
