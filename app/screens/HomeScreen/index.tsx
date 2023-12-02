import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, View, FlatList, TextStyle } from "react-native"
import { Screen } from "app/components"
import Carousel from "react-native-snap-carousel"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { movies } from "app/data/placeholders/movies"
import { Spacings, Text } from "react-native-ui-lib"
import { SimpleLineIcons } from "@expo/vector-icons"
import { TallMovieCard, BigMovieCard } from "./components"
import { translate } from "app/i18n"

const { width } = Dimensions.get("window")

interface HomeScreenProps extends TabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  return (
    <Screen contentContainerStyle={$root} safeAreaEdges={["top"]} preset="scroll">
      <View style={$header}>
        <Text style={$title}>{translate("homeScreen.title")}</Text>
        <SimpleLineIcons name="magnifier" size={24} />
      </View>
      <Carousel
        data={movies.results}
        loop
        layout="stack"
        containerCustomStyle={{ marginLeft: Spacings.s8 }}
        layoutCardOffset={22}
        /* TODO: remove @ts-ignore */
        /* @ts-ignore */
        renderItem={BigMovieCard}
        sliderWidth={width}
        itemWidth={width}
      />
      <Text style={[$categoryLabel, $disableMarginTop]}>
        {translate("homeScreen.categories.topRated")}
      </Text>
      <FlatList
        data={movies.results}
        /* TODO: remove @ts-ignore */
        /* @ts-ignore */
        renderItem={TallMovieCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
      <Text style={$categoryLabel}>{translate("homeScreen.categories.nowPlaying")}</Text>
      <FlatList
        data={movies.results}
        /* TODO: remove @ts-ignore */
        /* @ts-ignore */
        renderItem={TallMovieCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
      <Text style={$categoryLabel}>{translate("homeScreen.categories.upcoming")}</Text>
      <FlatList
        data={movies.results}
        /* TODO: remove @ts-ignore */
        /* @ts-ignore */
        renderItem={TallMovieCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </Screen>
  )
})

const $root: ViewStyle = { paddingBottom: Spacings.s10 }

const $title: TextStyle = {
  fontSize: 28,
}

const $categoryLabel: TextStyle = {
  fontSize: 18,
  marginLeft: Spacings.s4,
  marginTop: Spacings.s8,
  fontWeight: "bold",
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: Spacings.s8,
  paddingTop: Spacings.s6,
}

const $disableMarginTop: TextStyle = {
  marginTop: 0,
}
