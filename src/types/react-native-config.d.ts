declare module 'react-native-config' {
  export interface NativeConfig {
    SUPPORT_MAIL: string;
    TMDB_TOKEN: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
