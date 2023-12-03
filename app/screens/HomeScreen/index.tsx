import React, { FC, useCallback, useState, useEffect, Fragment } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Dimensions, View, FlatList, TextStyle, Alert } from "react-native"
import { FullScreenLoader, Screen } from "app/components"
import Carousel from "react-native-snap-carousel"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { movies } from "app/data/placeholders/movies"
import { Spacings, Text } from "react-native-ui-lib"
import { SimpleLineIcons } from "@expo/vector-icons"
import { TallMovieCard, BigMovieCard } from "./components"
import { translate } from "app/i18n"
import { MotiPressable } from "moti/interactions"
import { useNavigation } from "@react-navigation/native"
import { IMovie, api } from "app/services/api"

const { width } = Dimensions.get("window")

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
    // TODO: remove @ts-ignore
    // @ts-ignore
    navigation.navigate("MovieDetails", { movieID })
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesByCategory = await api.movies.getAllByCategory(1)
      setIsLoading(false)
      setMoviesByCategory(moviesByCategory)
      console.tron.log(moviesByCategory)
    }
    fetchMovies()
  }, [])

  const renderTallMovieCard = useCallback(({ item: movie }: { item: IMovie }) => {
    return <TallMovieCard information={movie} onPress={() => onMoviePress(movie.id)} />
  }, [])

  const renderBigMovieCard = useCallback(({ item: movie }: { item: IMovie }) => {
    return <BigMovieCard information={movie} onPress={() => onMoviePress(movie.id)} />
  }, [])

  if (isLoading) return <FullScreenLoader />
  if (!movies) return null

  return (
    <Screen contentContainerStyle={$root} safeAreaEdges={["top"]} preset="scroll">
      <View style={$header}>
        <Text style={$title}>{translate("homeScreen.title")}</Text>
        <MotiPressable
          onPress={() => Alert.alert("Coming soon!")}
          animate={({ pressed }) => {
            "worklet"
            return {
              scale: pressed ? 0.8 : 1,
            }
          }}
        >
          <SimpleLineIcons name="magnifier" size={24} />
        </MotiPressable>
      </View>
      {moviesByCategory.popular.length > 0 && (
        <Carousel
          data={moviesByCategory.popular}
          loop
          layout="stack"
          containerCustomStyle={{ marginLeft: Spacings.s8 }}
          layoutCardOffset={22}
          /* TODO: remove @ts-ignore */
          /* @ts-ignore */
          renderItem={renderBigMovieCard}
          sliderWidth={width}
          itemWidth={width}
        />
      )}
      {moviesByCategory.topRated.length > 0 && (
        <Fragment>
          <Text style={[$categoryLabel, $disableMarginTop]}>
            {translate("homeScreen.categories.topRated")}
          </Text>
          <FlatList
            data={moviesByCategory.topRated}
            /* TODO: remove @ts-ignore */
            /* @ts-ignore */
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
            /* TODO: remove @ts-ignore */
            /* @ts-ignore */
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
            /* TODO: remove @ts-ignore */
            /* @ts-ignore */
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
