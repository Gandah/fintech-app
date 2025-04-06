import { ClerkProvider,  useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
import * as SecureStore from "expo-secure-store";

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function InitialLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
   if(error) throw error;
  }, [error])
  

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    console.log('InSignedIn: ', isSignedIn);
    if(!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)" ;
    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/home');
    } else if (!isSignedIn) {
      router.replace('/');
    }
    
  }, [isSignedIn])
  

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href={"/help"} asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={34}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),

        }}
      />
      <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
