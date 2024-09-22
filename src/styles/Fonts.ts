import i18n from "../i18n";

const arabicFontFamily = {
  light: 'Cairo-Light',
  regular: 'Cairo-Regular',
  bold: 'Cairo-Bold',
}

const englishFontFamily = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  bold: 'Poppins-Bold',
}

const getFonts = () => {
  const currentLanguage = i18n.language;

  const activeFamily = currentLanguage === 'ar' ? arabicFontFamily : englishFontFamily;
  return {
    light: {
      fontFamily: activeFamily.light,
      fontSize: 14,
      fontWeight: '300',
    },
    regular: {
      fontFamily: activeFamily.regular,
      fontSize: 16,
      fontWeight: '400',
    },
    bold: {
      fontFamily: activeFamily.bold,
      fontSize: 18,
      fontWeight: '700',
    },
    heading: {
      fontFamily: activeFamily.bold,
      fontSize: 24,
      fontWeight: '700',
    },
    subheading: {
      fontFamily: activeFamily.regular,
      fontSize: 20,
      fontWeight: '400',
    },
    body: {
      fontFamily: activeFamily.regular,
      fontSize: 16,
      fontWeight: '400',
    },
    caption: {
      fontFamily: activeFamily.light,
      fontSize: 12,
      fontWeight: '300',
    },
  }
};

export default getFonts;