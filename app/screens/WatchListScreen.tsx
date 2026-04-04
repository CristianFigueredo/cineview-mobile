import React, { FC, useCallback } from "react"
import { observer, Observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { EmptyState, MovieCard, Screen } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"
import { IMovie } from "app/services/api"
import { getPosterUrl } from "app/services/api/constants"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { getSnapshot } from "mobx-state-tree"

interface Props extends TabScreenProps<"WatchList"> {}

export const WatchListScreen: FC<Props> = observer(function SearchScreen() {
  const navigation = useNavigation()
  const { watchListStore } = useStores()
  const onMoviePress = useCallback((movieID: number) => {
    // @ts-ignore TODO: fix this type error
    navigation.navigate("MovieDetails", { movieID })
  }, [])

  const renderMovieListItem = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => {
      return (
        <MovieCard
          posterUri={getPosterUrl(movie.poster_path, "w342")}
          title={movie.title}
          overview={movie.overview}
          voteAverage={movie.vote_average}
          onPress={() => onMoviePress(movie.id)}
          index={index}
        />
      )
    },
    [],
  )

  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$root} preset="scroll">
      <Observer>
        {() => (
          <FlashList
            data={getSnapshot(watchListStore.movies)}
            contentContainerStyle={{ paddingTop: Spacings.s8 }}
            showsVerticalScrollIndicator={false}
            renderItem={renderMovieListItem}
            estimatedItemSize={180}
            ListEmptyComponent={() => (
              <EmptyState
                // @ts-ignore TODO: fix this type error
                button={{ onPress: () => navigation.navigate("Home"), label: "Show Movies" }}
                message="Start Building Your Film Collection"
              />
            )}
          />
        )}
      </Observer>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: Spacings.s3,
  paddingTop: Spacings.s5,
}
