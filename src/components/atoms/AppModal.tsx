import {FC, ReactNode} from 'react';
import { Modal, ModalProps, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { height, width } from '@styles/metrics';

interface AppModalProps extends ModalProps{
  children: ReactNode;
  visible: boolean;
  handleClose: () => void;
  viewStyle?: ViewStyle;
}

const AppModal: FC<AppModalProps> = ({children, visible, handleClose, viewStyle, ...props}) => {
  const { colors } = useTheme();

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleClose}
      {...props}
      >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.modalBody,
          {
            flex: 1,
            borderColor: colors.secondary600,
            backgroundColor: colors.primary500,
            shadowColor: colors.secondary600,
          },
          viewStyle
        ]}>
          {children}
        </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalBody: {
    position: 'absolute',
    bottom: height * 0.3,
    left: width * 0.05,
    width: width * 0.9,
    maxHeight: height * 0.65,
    minHeight: height / 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    borderWidth: 1,
    elevation: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#rgba(22, 21, 21, 0.8)',
  },
})