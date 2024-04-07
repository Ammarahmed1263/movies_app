import ContextProvider from './src/store/context/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>
  );
}
