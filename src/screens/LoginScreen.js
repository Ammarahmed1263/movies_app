import {Button, ImageBackground, Text, TextInput, View} from 'react-native';

function LoginScreen() {
  return (
    <View
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
    >
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.7)',
          width: '80%',
          height: '40%',
        }}>
        <Text>Welcome back,</Text>
        <TextInput>hello</TextInput>
        <TextInput>hello</TextInput>
        <Button title="click me" />
      </View>
    </View>
  );
}

export default LoginScreen;
