import ContextProvider from './src/context/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <ContextProvider>
      <AppNavigation />
    </ContextProvider>
  );
}
