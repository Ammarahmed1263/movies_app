import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import AddToListSheet from './AddToListSheet';
import ImagePickerSheet from './ImagePickerSheet';
import DeleteAccountSheet from './DeleteAccountSheet';

registerSheet('add-to-list', AddToListSheet);
registerSheet('image-picker', ImagePickerSheet);
registerSheet('delete-account', DeleteAccountSheet);
 
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-to-list': SheetDefinition;
    'image-picker': SheetDefinition<{
      payload: {
        onImageSelected: (uri: string | undefined) => void;
      };
    }>
    'delete-account': SheetDefinition
  }
}