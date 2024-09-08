import ThemeProvider from './src/contexts/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';
import './src/i18n'

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
