import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import {Asset} from 'react-native-image-picker';
import AboutSheet from './AboutSheet';
import AddToListSheet from './AddToListSheet';
import CreateListSheet from './CreateListSheet';
import DeleteAccountSheet from './DeleteAccountSheet';
import ImagePickerSheet from './ImagePickerSheet';

registerSheet('add-to-list', AddToListSheet);
registerSheet('create-list', CreateListSheet);
registerSheet('image-picker', ImagePickerSheet);
registerSheet('delete-account', DeleteAccountSheet);
registerSheet('about-app', AboutSheet);

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'add-to-list': SheetDefinition;
    'image-picker': SheetDefinition<{
      payload: {
        onImageSelected: (uri: Asset) => void;
      };
    }>;
    'delete-account': SheetDefinition;
    'create-list': SheetDefinition<{
      payload: {
        onListCreated: (list: number) => void;
      };
    }>;
    'about-app': SheetDefinition;
  }
}
