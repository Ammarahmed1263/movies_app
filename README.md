</div>
<div align="center">
<a href="https://github.com/ammarahmed1263/movies_app" target="blank">
<img src="./src/assets/images/round_logo.png" width="90" alt="Logo" />
</a>

<a id="readme-top"></a>

<h2> Project Name : Movie Corn </h2>

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#tech-stack">Tech Stack</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

[![Product Name Screen Shot][product-screenshot]](src/assets/images/mockup.png)

<a id="overview"></a>

## 💡 Overview

MoviesApp is a feature-rich, beautifully animated mobile application built using React Native and Firebase, designed to offer a smooth and personalized movie browsing experience. With support for voice search, multilingual content, and dynamic user lists, MoviesApp makes it effortless to explore trending titles and keep track of your favorites. Key features include:

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="features"></a>

## ✨ Features

- **Google Authentication:** Secure login with personalized access levels.
- **Voice Search:** Search for movies using voice commands.
- **Multilingual Content:** Support for multiple languages.
- **Movie details and recommendations:** Get detailed information about movies and personalized recommendations.
- **Cast details:** Get detailed information about cast members.
- **watch trailers:** Watch trailers for movies without leaving the app.
- **Dynamic User Lists:** Create and manage personalized lists of movies.
- **Dark Mode:** A comfortable and visually appealing dark mode.
- **Localization:** Support for multiple languages."Arabic" and "English".
- **Cloud Storage:** Store user lists images and profile pictures on secure cloud store.
- **Landscape Mode:** Support for landscape mode.
- **Responsive Design:** Support for multiple screen sizes.
- **Offline Mode:** Allow user to use the app without internet connection.
- **Smooth Animations:** A smooth and visually appealing user experience with reanimated.
- **Favorites:** Save your favorite movies.
- **Push Notifications:** Receive push notifications for important updates.
- **Trailers Sharing:** Share trailers with friends.
- **Genres Filtering:** Filter movies by genres.
- **Deep Linking:** Navigate to specific pages within the app using deep links.

Whether you're a movie enthusiast or building a showcase app, MoviesApp is the perfect platform for discovering, organizing, and exploring films with ease. 🎬

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="tech-stack"></a>

## 👩‍💻 Tech Stack

- **React Native**: A framework for building cross-platform mobile applications.
- **Typescript**: A programming language that adds static types to JavaScript.
- **Redux"RTK"**: A global state management library for React applications.
- **Redux-persist**: A library for persisting redux state.
- **Firebase**: A backend service for authentication and database.
- **Cloudinary**: A cloud storage service for images and videos.
- **notifee**: A library for handling push notifications.
- **Yarn**: A fast JavaScript runtime that includes a package manager, task runner, and more.
- **Reactotron**: A debugging tool for React Native applications.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="getting-started"></a>

## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

<a id="prerequisites"></a>

### 🚀 Prerequisites

- **Node.js** (v18.x or higher) and **npm** or **yarn**.
- **Npm** If you prefer using npm for package management and running scripts.
- **Yarn** If you prefer using yarn for package management and running scripts.
- **Cloudinary Account**.
- **Firebase Account**.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="installation"></a>

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ammarahmed1263/movies_app.git
   cd movies_app
   ```

2. **Install dependencies:**

   ```bash
   # using npm
   npm install

   # using Yarn
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   TMDB_TOKEN = your_tmdb_token

   SUPPORT_MAIL = your_support_email

   #google
   WEB_CLIENT_ID = your_web_client_id

   #cloudinary
   CLOUDINARY_API_KEY = your_cloudinary_storage_api_key
   CLOUDINARY_API_SECRET = your_cloudinary_storage_api_secret
   ```

4. **Start the development server:**

   ```bash
   # using npm
   npm start

   # using Yarn
   yarn start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<a id="usage"></a>

## 📖 Usage

### ✔ Running the Mobile App

- **Android:** `npm run android`, `yarn android`, or `bun run android`.
- **iOS:** `npm run ios`, `yarn ios`, or `bun run ios`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[product-screenshot]: src/assets/images/mockup.png
