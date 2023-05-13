import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Image, Text, View, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts(Ionicons.font);
  // const isDark = useColorScheme() === "dark";
  const isDark = true;
  useEffect(() => {
    async function prepare() {
      try {
        await Image.prefetch(
          "https://www.cosmorning.com/data/photos/20230206/art_1675847707141_9b14cd.jpg"
        );

        setReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
      }
    }
    prepare();
  }, []);

  const view = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!ready) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
          <View onLayout={view} />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
