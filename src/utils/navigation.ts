import {createNavigationContainerRef} from '@react-navigation/native';
import {MainStackParamList} from 'types/mainStackTypes';

export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export function navigate<T extends keyof MainStackParamList>(
  name: T,
  params: MainStackParamList[T] | undefined,
) {
  if (navigationRef.isReady()) {
    // @ts-ignore
    navigationRef.navigate(name, params);
  }
}
