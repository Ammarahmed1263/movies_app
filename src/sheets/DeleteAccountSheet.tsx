import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, vs} from '@styles/metrics';
import {StyleSheet, View} from 'react-native';
import ActionSheet, {SheetManager, SheetProps} from 'react-native-actions-sheet';

const DeleteAccountSheet = (props: SheetProps<'delete-account'>) => {
  const {colors} = useTheme();
  console.log('delete sheet is active');

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}
      CustomHeaderComponent={
        <AppText style={{height: 30}} variant="heading">
          Danger Zone
        </AppText>
      }>
      <View style={[styles.header, {borderBottomColor: colors.paleShade}]}>
        <AppText variant="heading">Danger Zone</AppText>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <AppText style={styles.text}>
            Are you sure you want to{' '}
            <AppText style={[styles.text, {fontWeight: 'bold'}]}>
              delete your account?
            </AppText>
          </AppText>
          <AppText style={styles.text}>
            You won't be able to revert this action.
          </AppText>
        </View>

        <View>
          <AppButton
            onPress={props.payload.onDelete}
            style={{backgroundColor: colors.error, marginBottom: vs(8)}}>
            Delete Anyway
          </AppButton>
          <AppButton
            onPress={() => SheetManager.hide('delete-account')}
            style={{
              borderWidth: 1,
              borderColor: colors.paleShade,
              padding: hs(10),
            }}
            textStyle={{color: colors.paleShade}}
            flat>
            Cancel
          </AppButton>
        </View>
      </View>
    </ActionSheet>
  );
};

export default DeleteAccountSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: hs(15),
    paddingBottom: vs(10),
  },
  header: {
    alignItems: 'center',
    paddingVertical: hs(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    paddingVertical: vs(20),
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
