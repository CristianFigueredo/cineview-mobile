import React, { useCallback, Fragment } from "react"
import { ViewStyle, useWindowDimensions, FlatList, TextStyle } from "react-native"
import { View } from "react-native"
import { LoadingIndicator, Screen, FeaturedCard, PosterCard } from "app/components"
import Carousel from "react-native-snap-carousel"
import { Spacings, Text } from "react-native-ui-lib"
import Icon from "@expo/vector-icons/Octicons"
import { translate } from "app/i18n"
import { MotiPressable } from "moti/interactions"
import { useNavigation } from "@react-navigation/native"
import { IMovie } from "app/services/api"
import { getPosterUrl } from "app/services/api/constants"
import { useHomeMovies } from "app/hooks/useHomeMovies"



const FEATURED_CAROUSEL_LIMIT = 8

type MovieCategoryRowProps = {
  title: string
  data: IMovie[]
  renderItem: ({ item, index }: { item: IMovie; index: number }) => React.ReactElement
  isFirst?: boolean
}

const MovieCategoryRow = ({
  title,
  data,
  renderItem,
  isFirst = false,
}: MovieCategoryRowProps) => {
  if (data.length === 0) return null
  return (
    <Fragment>
      <Text style={[$categoryLabel, isFirst && $noTopMargin]}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Fragment>
  )
}

export const HomeScreen = () => {
  const navigation = useNavigation()
  const { width: screenWidth } = useWindowDimensions()
  const { data: moviesByCategory, isLoading, isError } = useHomeMovies()

  const onMoviePress = useCallback(
    (movieID: number) => {
      // @ts-ignore TODO: fix navigation param types
      navigation.navigate("MovieDetails", { movieID })
    },
    [navigation],
  )

  const renderPosterCard = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => (
      <PosterCard
        index={index}
        posterUri={getPosterUrl(movie.poster_path, "w342")}
        title={movie.title}
        onPress={() => onMoviePress(movie.id)}
      />
    ),
    [onMoviePress],
  )

  const renderFeaturedCard = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => (
      <FeaturedCard
        index={index}
        posterUri={getPosterUrl(movie.poster_path, "w500")}
        title={movie.title}
        onPress={() => onMoviePress(movie.id)}
      />
    ),
    [onMoviePress],
  )

  const motiScalePressFeedback = useCallback(({ pressed }: { pressed: boolean }) => {
    "worklet"
    return { scale: pressed ? 0.8 : 1 }
  }, [])

  if (isLoading) return <LoadingIndicator />
  if (isError || !moviesByCategory) return null

  return (
    <Screen contentContainerStyle={$root} safeAreaEdges={["top"]} preset="scroll">
      <View style={$header}>
        <Text style={$title}>{translate("homeScreen.title")}</Text>
        <MotiPressable
          /* @ts-ignore TODO: fix MotiPressable types */
          onPress={() => navigation.navigate("Search")}
          animate={motiScalePressFeedback}
        >
          <Icon name="search" size={22} />
        </MotiPressable>
      </View>

      {moviesByCategory.popular.length > 0 && (
        <Carousel
          data={moviesByCategory.popular.slice(0, FEATURED_CAROUSEL_LIMIT)}
          layout="stack"
          contentContainerCustomStyle={$carouselContentContainer}
          // @ts-ignore TODO: fix snap-carousel types
          renderItem={renderFeaturedCard}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
        />
      )}

      <MovieCategoryRow
        title={translate("homeScreen.categories.topRated")}
        data={moviesByCategory.topRated}
        renderItem={renderPosterCard}
        isFirst
      />
      <MovieCategoryRow
        title={translate("homeScreen.categories.nowPlaying")}
        data={moviesByCategory.nowPlaying}
        renderItem={renderPosterCard}
      />
      <MovieCategoryRow
        title={translate("homeScreen.categories.upcoming")}
        data={moviesByCategory.upcoming}
        renderItem={renderPosterCard}
      />
    </Screen>
  )
}

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

const $noTopMargin: TextStyle = {
  marginTop: 0,
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: Spacings.s8,
  paddingTop: Spacings.s6,
}

const $carouselContentContainer: ViewStyle = {
  paddingLeft: Spacings.s6,
  paddingVertical: Spacings.s10,
}
