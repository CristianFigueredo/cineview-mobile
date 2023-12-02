import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { translate } from "../i18n"
import * as Screens from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { AnimatedTabBarNavigator, DotSize } from "react-native-animated-nav-tab-bar"
import Icon from "@expo/vector-icons/SimpleLineIcons"

type TabBarIconProps = {
  focused: boolean
  color: string
  size: number
}

export type TabParamList = {
  Home: undefined
  Search: undefined
  WatchList: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = AnimatedTabBarNavigator<TabParamList>()

export function RootNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      appearance={{
        shadow: true,
        dotSize: DotSize.SMALL,
      }}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          tabBarLabel: translate("rootNavigator.homeTabLabel"),
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={Screens.SearchScreen}
        options={{
          tabBarLabel: translate("rootNavigator.searchTabLabel"),
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Icon name="magnifier" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="WatchList"
        component={Screens.WatchListScreen}
        options={{
          tabBarLabel: translate("rootNavigator.watchListTabLabel"),
          tabBarIcon: ({ color, size }: TabBarIconProps) => (
            <Icon name="playlist" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
