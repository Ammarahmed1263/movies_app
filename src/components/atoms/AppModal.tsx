import {useTheme} from '@contexts/ThemeContext';
import useOrientation from '@hooks/useOrientation';
import {hs, vs} from '@styles/metrics';
import {FC, ReactNode} from 'react';
import {
  Modal,
  ModalProps,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface AppModalProps extends ModalProps {
  children: ReactNode;
  visible: boolean;
  handleClose: () => void;
  viewStyle?: ViewStyle;
}

const AppModal: FC<AppModalProps> = ({
  children,
  visible,
  handleClose,
  viewStyle,
  ...props
}) => {
  const {colors} = useTheme();
  const {width} = useOrientation();

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleClose}
      {...props}>
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={{...StyleSheet.absoluteFillObject}} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modalBody,
            {
              width: width * 0.9,
              borderColor: colors.secondary600,
              backgroundColor: colors.primary500,
              shadowColor: colors.secondary600,
            },
            viewStyle,
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(22, 21, 21, 0.8)',
  },
  modalBody: {
    paddingVertical: vs(15),
    paddingHorizontal: hs(20),
    borderRadius: 30,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.5,
        shadowOffset: {width: 2, height: 4},
        shadowRadius: 10,
      },
      android: {
        elevation: 12,
      },
    }),
  },
});
