import React, { FC, useCallback, useState, useEffect, Fragment } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, View, FlatList, TextStyle, Alert, Platform } from "react-native"
import { FullScreenLoader, Screen } from "app/components"
import Carousel from "react-native-snap-carousel"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { Spacings, Text } from "react-native-ui-lib"
import Icon from "@expo/vector-icons/Octicons"
import { TallMovieCard, BigMovieCard } from "./components"
import { translate } from "app/i18n"
import { MotiPressable } from "moti/interactions"
import { useNavigation } from "@react-navigation/native"
import { IMovie, api } from "app/services/api"
import * as storage from "app/utils/storage"

interface HomeScreenProps extends TabScreenProps<"Home"> {}

// TODO: Move to a types file
export interface MoviesState {
  popular: IMovie[]
  upcoming: IMovie[]
  topRated: IMovie[]
  nowPlaying: IMovie[]
}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(true)
  const [moviesByCategory, setMoviesByCategory] = useState<MoviesState>({
    popular: [],
    upcoming: [],
    topRated: [],
    nowPlaying: [],
  })

  const onMoviePress = useCallback((movieID: number) => {
    // @ts-ignore TODO: fix this type error
    navigation.navigate("MovieDetails", { movieID })
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesByCategory = await api.movies.getAllByCategory(1)
        storage.saveString("moviesByCategory", JSON.stringify(moviesByCategory))
        setIsLoading(false)
        setMoviesByCategory(moviesByCategory)
      } catch (error) {
        Alert.alert("An error occurred while fetching movies")
      }
    }
    const main = async () => {
      const localMoviesByCategory = await storage.loadString("moviesByCategory")
      if (localMoviesByCategory) {
        setMoviesByCategory(JSON.parse(localMoviesByCategory) as MoviesState)
        setIsLoading(false)
      } else {
        fetchMovies()
      }
    }
    main()
  }, [])

  const renderTallMovieCard = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => {
      return (
        <TallMovieCard index={index} information={movie} onPress={() => onMoviePress(movie.id)} />
      )
    },
    [],
  )

  const renderBigMovieCard = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => {
      return (
        <BigMovieCard index={index} information={movie} onPress={() => onMoviePress(movie.id)} />
      )
    },
    [],
  )

  const motiScalePressFeedback = useCallback(({ pressed }: { pressed: boolean }) => {
    "worklet"
    return {
      scale: pressed ? 0.8 : 1,
    }
  }, [])

  if (isLoading) return <FullScreenLoader />

  return (
    <Screen contentContainerStyle={$root} safeAreaEdges={["top"]} preset="scroll">
      <View style={$header}>
        <Text style={$title}>{translate("homeScreen.title")}</Text>
        <MotiPressable
          /* @ts-ignore TODO: fix types */
          onPress={() => navigation.navigate("Search")}
          animate={motiScalePressFeedback}
        >
          <Icon name="search" size={24} />
        </MotiPressable>
      </View>
      {moviesByCategory.popular.length > 0 && (
        <Carousel
          data={moviesByCategory.popular.slice(0, 8)}
          layout="stack"
          contentContainerCustomStyle={$carouselContentContainer}
          // @ts-ignore TODO: fix this type error
          renderItem={renderBigMovieCard}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH}
        />
      )}
      {moviesByCategory.topRated.length > 0 && (
        <Fragment>
          <Text style={[$categoryLabel, $disableMarginTop]}>
            {translate("homeScreen.categories.topRated")}
          </Text>
          <FlatList
            data={moviesByCategory.topRated}
            // @ts-ignore TODO: fix this type error
            renderItem={renderTallMovieCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </Fragment>
      )}
      {moviesByCategory.nowPlaying.length > 0 && (
        <Fragment>
          <Text style={$categoryLabel}>{translate("homeScreen.categories.nowPlaying")}</Text>
          <FlatList
            data={moviesByCategory.nowPlaying}
            // @ts-ignore TODO: fix this type error
            renderItem={renderTallMovieCard}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Fragment>
      )}
      {moviesByCategory.upcoming.length > 0 && (
        <Fragment>
          <Text style={$categoryLabel}>{translate("homeScreen.categories.upcoming")}</Text>
          <FlatList
            data={moviesByCategory.upcoming}
            // @ts-ignore TODO: fix this type error
            renderItem={renderTallMovieCard}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </Fragment>
      )}
    </Screen>
  )
})

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const isAndroid = Platform.OS === "android"

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

const $carouselContentContainer: ViewStyle = {
  paddingLeft: isAndroid ? SCREEN_WIDTH * 0.15 : SCREEN_WIDTH * 0.1,
  paddingVertical: Spacings.s10,
}
