declare module 'react-native-config' {
  export interface NativeConfig {
      TMDB_TOKEN?: string;
  }
  
  export const Config: NativeConfig
  export default Config
}