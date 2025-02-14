import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import AddToListSheet from './AddToListSheet';
import ImagePickerSheet from './ImagePickerSheet';
import DeleteAccountSheet from './DeleteAccountSheet';
import CreateListSheet from './CreateListSheet';
import AboutSheet from './AboutSheet';

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
        onImageSelected: (uri: string | undefined) => void;
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
