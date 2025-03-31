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
            onPress={props.payload.onDelete}
            style={{backgroundColor: colors.error, marginBottom: vs(8)}}>
            {t('delete_anyway')}
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
