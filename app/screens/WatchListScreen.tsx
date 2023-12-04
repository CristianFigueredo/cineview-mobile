import React, { FC, useCallback } from "react"
import { observer, Observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { EmptyStateFullScreen, Screen } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { HorizontalMovieCard } from "app/components/HorizontalMovieCard"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"
import { IMovie } from "app/services/api"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "app/models"
import { autorun } from "mobx"
import { getSnapshot } from "mobx-state-tree"

interface Props extends TabScreenProps<"WatchList"> {}

export const WatchListScreen: FC<Props> = observer(function SearchScreen() {
  const navigation = useNavigation()
  const { watchListStore } = useStores()
  autorun(() => {
    console.tron.log(watchListStore)
  })
  const onMoviePress = useCallback((movieID: number) => {
    // @ts-ignore TODO: fix this type error
    navigation.navigate("MovieDetails", { movieID })
  }, [])

  const renderHorizontalMovieCard = useCallback(
    ({ item: movie, index }: { item: IMovie; index: number }) => {
      return (
        <HorizontalMovieCard
          posterURL={POSTER_IMAGE_BASE_URL + movie.poster_path}
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
            renderItem={renderHorizontalMovieCard}
            estimatedItemSize={180}
            ListEmptyComponent={() => (
              <EmptyStateFullScreen
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
