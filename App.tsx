import ThemeProvider from './src/context/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import './src/i18n'

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
