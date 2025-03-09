import AppButton from '@atoms/AppButton';
import AppImage from '@atoms/AppImage';
import AppText from '@atoms/AppText';
import {useTheme} from '@contexts/ThemeContext';
import {height, hs, vs} from '@styles/metrics';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import ActionSheet, {
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutSheet = (props: SheetProps<'about-app'>) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={{
        ...styles.actionSheet,
        backgroundColor: colors.primary500,
      }}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={{flex: 1}} />

          <AppImage
            source={require('../assets/images/logo.png')}
            viewStyle={styles.logo}
            resizeMode="contain"
          />

          <AppButton
            onPress={() => SheetManager.hide(props.sheetId)}
            style={styles.closeButton}
            pressableStyle={{
              flex: 0,
              alignItems: 'flex-end',
            }}
            customView
            flat>
            <Icon name="close-circle" size={hs(35)} color={colors.primary700} />
          </AppButton>
        </View>
        <AppText variant="heading" style={styles.heading}>
          {t('about')} {t('movie')} {t('corn')}
        </AppText>
        <AppText style={styles.description}>{t('description1')}</AppText>
        <AppText style={styles.description}>{t('description2')}</AppText>
        <AppText variant="subheading" style={styles.subheading}>
          {t('features')}:
        </AppText>
        <View style={styles.featureList}>
          <AppText variant="regular" style={styles.featureItem}>
            • {t('feature1')}
          </AppText>
          <AppText variant="regular" style={styles.featureItem}>
            • {t('feature2')}
          </AppText>
          <AppText variant="regular" style={styles.featureItem}>
            • {t('feature3')}
          </AppText>
          <AppText variant="regular" style={styles.featureItem}>
            • {t('feature4')}
          </AppText>
        </View>
        <AppText
          variant="caption"
          style={{...styles.version, color: colors.primary600}}>
          Version 1.0.0
        </AppText>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionSheet: {
    borderTopRightRadius: hs(30),
    borderTopLeftRadius: hs(30),
  },
  contentContainer: {
    padding: hs(20),
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 0,
    width: hs(70),
    aspectRatio: 1 / 1.4,
    marginBottom: vs(10),
  },
  closeButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  heading: {
    marginBottom: vs(10),
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: vs(10),
  },
  subheading: {
    marginTop: vs(15),
    marginBottom: vs(10),
    alignSelf: 'flex-start',
  },
  featureList: {
    alignSelf: 'stretch',
    paddingHorizontal: hs(10),
  },
  featureItem: {
    marginBottom: vs(8),
  },
  version: {
    marginTop: vs(20),
    marginBottom: vs(8),
  },
});

export default AboutSheet;
