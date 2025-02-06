This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

// TODO:IN PROGRESS:

- create search layout "trending movies, top genres, popular actors" + add home screen trailer section
- notification for "want to watch movies, genres from past search"
- image storage "imgur - cloudinary"
- react native shared animation element
- introduce welcome screen + handle language and theme there
- use app responsive size "in progress"
- check what happens in redux
- fix mic recording with search screen and add to list action sheet

// HIGH PRIORITY:

- support landscape mode "youtube modal"
- add social login
- find a way to set i18n language correctly 'from user firestore'
- fix lag with arabic "deffered"

// LOWER PRIORITY:

- fix native device theme switch not working
- add admin account "change home layout"
