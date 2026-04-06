import React, { useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { EmptyState, MovieCard, Screen } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"
import { IMovie } from "app/services/api"
import { getPosterUrl } from "app/services/api/constants"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"

interface Props extends TabScreenProps<"WatchList"> {}

export const WatchListScreen = observer(function WatchListScreen(_: Props) {
  const navigation = useNavigation()
  const { watchListStore } = useStores()

  const onMoviePress = useCallback(
    (movieID: number) => {
      // @ts-ignore TODO: fix navigation param types
      navigation.navigate("MovieDetails", { movieID })
    },
    [navigation],
  )

  const renderMovieCard = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => (
      <MovieCard
        posterUri={getPosterUrl(movie.poster_path, "w342")}
        title={movie.title}
        overview={movie.overview}
        voteAverage={movie.vote_average}
        onPress={() => onMoviePress(movie.id)}
        index={index}
      />
    ),
    [onMoviePress],
  )

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$root} preset="scroll">
      <FlashList
        data={watchListStore.movies.slice()}
        contentContainerStyle={{ paddingTop: Spacings.s8 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderMovieCard}
        ListEmptyComponent={() => (
          <EmptyState
            button={{
              // @ts-ignore TODO: fix navigation param types
              onPress: () => navigation.navigate("Home"),
              label: "Show Movies",
            }}
            message="Start Building Your Film Collection"
          />
        )}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: Spacings.s3,
  paddingTop: Spacings.s5,
}
