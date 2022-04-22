import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import theme from '@config/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import Splash from '@components/splash';
import { AuthProvider, useAuth } from '@providers/auth';
import Main from '@navigators/main';
import Auth from '@navigators/auth';

const App = () => {
  const { isLogged, loading } = useAuth();
  console.log(isLogged);
  if (loading) return <Splash />;
  if (isLogged) return <Main />;

  return <Auth />;
};

const ContextualizedApp = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <NavigationContainer>
      <SafeAreaProvider>
        <ThemeProvider theme={{ ...eva.light, ...theme.light }}>
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme.light }}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ApplicationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  </>
);

export default ContextualizedApp;
