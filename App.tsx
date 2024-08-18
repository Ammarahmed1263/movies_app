import ThemeProvider from './src/context/ThemeContext';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
}
