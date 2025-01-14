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

- details screen(s) loading
- use app responsive size "in progress"
- create search layout "trending movies, top genres, popular actors"
- add profile and home user collections "favorites, collections, gmail"
- notification for "want to watch movies, genres from past search"
- introduce welcome screen + handle language and theme there
- report problem - FAQ - contact us
- fix ios voice search "delete search then clicking mic restores the search key - problem with voice start and end'

// HIGH PRIORITY:
- fix text alignment with arabic
- getUserProfile function is called in app.tsx and themecontext before user is authenticated
- support landscape mode "carousel, youtube modal"
- add social login
- find a way to set i18n language correctly 'from user firestore'
- fix lag with arabic in android "deffered"
- add home screen trailer section

// LOWER PRIORITY:
- create firebase types "user, collections, etc..."
- fix native device theme switch not working
- find fix for theme with navigation "works without bottom tabs borders"
- add render views component for a dynamic home page