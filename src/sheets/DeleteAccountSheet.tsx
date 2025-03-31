import AppButton from '@atoms/AppButton';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {hs, vs} from '@styles/metrics';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';

const DeleteAccountSheet = (props: SheetProps<'delete-account'>) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const handleDeleteAccount = async () => {
    await props.payload.onDelete();
    SheetManager.hide('delete-account');
  };
  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{backgroundColor: colors.primary500}}
      indicatorStyle={{backgroundColor: colors.primary700}}>
      <View style={[styles.header, {borderBottomColor: colors.paleShade}]}>
        <AppText variant="heading">{t('danger_zone')}</AppText>
      </View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <AppText style={styles.text}>
            {t('warn_question')}
            <AppText style={[styles.text, {fontWeight: 'bold'}]}>
              {t('warn_question2')}
            </AppText>
          </AppText>
          <AppText style={styles.text}>{t('warn')}</AppText>
        </View>

        <View>
          <AppButton
            onPress={handleDeleteAccount}
            pressableStyle={{
              backgroundColor: colors.error,
            }}
            style={{
              backgroundColor: 'transparent',
              marginBottom: vs(8),
              height: hs(40),
            }}>
            {t('delete_anyway')}
          </AppButton>
          <AppButton
            onPress={() => SheetManager.hide('delete-account')}
            pressableStyle={{
              flex: 1,
              borderWidth: 1,
              borderColor: colors.paleShade,
              borderRadius: hs(8),
            }}
            style={{
              height: hs(40),
            }}
            textStyle={{color: colors.paleShade}}
            flat>
            {t('cancel')}
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
