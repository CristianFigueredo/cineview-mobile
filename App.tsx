import React from "react"
import * as SplashScreen from "expo-splash-screen"
import { configureTheme } from "app/theme/setup"
import { LogBox } from "react-native"

configureTheme()
LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native"])

// eslint-disable-next-line import/first
import App from "./app/app"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
