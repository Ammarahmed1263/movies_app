import {navigate} from './navigation';
import {Linking} from 'react-native';
import {SheetManager} from 'react-native-actions-sheet';

type DeepLinkConfig = {
  movie: (id: number) => void;
  person: (id: number) => void;
  list: () => void;
};

const handleListNavigation = () => {
  // Navigate to profile tab first
  navigate('BottomTabs', {screen: 'Profile'});

  // Show create list sheet with delay
  const onListCreated = (listId: number) => {
    navigate('Liststack', {
      screen: 'ListDetailsScreen',
      params: {listId},
    });
  };

  setTimeout(() => {
    SheetManager.show('create-list', {payload: {onListCreated}});
  }, 800);
};

const routes: DeepLinkConfig = {
  movie: id => navigate('MovieDetails', {id}),
  person: id => navigate('CastMemberDetails', {id}),
  list: () => handleListNavigation(),
};

const deepLinking = async (url: string): Promise<void> => {
  try {
    const segments = url.split('/');
    const key = segments[segments.length - 1];

    // Handle list route separately as it doesn't have an ID
    if (key === 'list') {
      routes.list();
      return;
    }

    // Handle routes with IDs
    const id = Number(segments.pop());
    const routeKey = segments[segments.length - 1] as keyof DeepLinkConfig;

    if (routes[routeKey]) {
      routes[routeKey](id);
    } else {
      await Linking.openURL(url);
    }
  } catch (err) {
    console.error('Deep linking error:', err);
  }
};

export default deepLinking;
