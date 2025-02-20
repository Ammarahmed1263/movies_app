declare module 'react-native-config' {
  export interface NativeConfig {
    SUPPORT_MAIL: string;
    TMDB_TOKEN: string;
    WEB_CLIENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
