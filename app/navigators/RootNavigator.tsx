import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { translate } from "../i18n"
import * as Screens from "../screens"
import { Colors } from "react-native-ui-lib"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { AnimatedTabBarNavigator, DotSize } from "react-native-animated-nav-tab-bar"
import Icon from "@expo/vector-icons/Feather"

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
  return (
    <Tab.Navigator
      appearance={{
        shadow: false,
        dotSize: DotSize.SMALL,
        tabBarBackground: Colors.$backgroundElevated,
      }}
      tabBarOptions={{
        activeTintColor: Colors.$iconPrimary,
        activeBackgroundColor: Colors.$backgroundNeutralMedium,
        tabStyle: {
          shadowColor: Colors.$backgroundNeutralHeavy,
          shadowOpacity: 0.35,
          shadowRadius: 12,
          shadowOffset: { height: 5, width: 0 },
        },
        size: 64,
      }}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Screens.HomeScreen}
        options={{
          tabBarLabel: translate("rootNavigator.homeTabLabel"),
          tabBarIcon: ({ color }: TabBarIconProps) => <Icon name="home" size={23} color={color} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={Screens.SearchScreen}
        options={{
          tabBarLabel: translate("rootNavigator.searchTabLabel"),
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Icon name="search" size={23} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="WatchList"
        component={Screens.WatchListScreen}
        options={{
          tabBarLabel: translate("rootNavigator.watchListTabLabel"),
          tabBarIcon: ({ color }: TabBarIconProps) => <Icon name="heart" size={23} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
