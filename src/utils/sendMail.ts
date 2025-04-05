import {ContactUsMessage} from '../constants';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import {Alert, Linking} from 'react-native';

const sendMail = async () => {
  const email = Config.SUPPORT_MAIL;
  const subject = 'Support Request - Movies Corn';
  const body = encodeURIComponent(ContactUsMessage(auth().currentUser?.email));

  const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${body}`;

  Linking.canOpenURL(mailtoURL)
    .then(supported => {
      if (!supported) {
        Alert.alert('Error', 'Unable to open email client.');
      } else {
        Linking.openURL(mailtoURL);
      }
    })
    .catch(err => console.error('Error opening email client:', err));
};

export default sendMail;
