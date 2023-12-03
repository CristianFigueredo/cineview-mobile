import React, { FC, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { HorizontalMovieCard } from "app/components/HorizontalMovieCard"
import { movies } from "app/data/placeholders"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"
import { IMovie } from "app/services/api"
import { useNavigation } from "@react-navigation/native"

interface Props extends TabScreenProps<"WatchList"> {}

export const WatchListScreen: FC<Props> = observer(function SearchScreen() {
  const navigation = useNavigation()

  const onMoviePress = useCallback((movieID: number) => {
    // TODO: remove @ts-ignore
    // @ts-ignore
    navigation.navigate("MovieDetails", { movieID })
  }, [])

  const renderHorizontalMovieCard = useCallback(({ item: movie }: { item: IMovie }) => {
    return (
      <HorizontalMovieCard
        posterURL={POSTER_IMAGE_BASE_URL + movie.poster_path}
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        onPress={() => onMoviePress(movie.id)}
      />
    )
  }, [])

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$root} preset="scroll">
      <FlashList
        data={movies.results}
        contentContainerStyle={{ paddingTop: Spacings.s8 }}
        renderItem={renderHorizontalMovieCard}
        estimatedItemSize={180}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: Spacings.s3,
  paddingTop: Spacings.s5,
}
