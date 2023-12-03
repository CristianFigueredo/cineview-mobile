import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { HorizontalMovieCard } from "app/components/HorizontalMovieCard"
import { movies } from "app/data/placeholders"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"

interface Props extends TabScreenProps<"WatchList"> {}

export const WatchListScreen: FC<Props> = observer(function SearchScreen() {
  return (
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$root} preset="scroll">
      <FlashList
        data={movies.results}
        contentContainerStyle={{ paddingTop: Spacings.s8 }}
        renderItem={({ item: movie, index }) => (
          <HorizontalMovieCard
            key={index}
            posterURL={POSTER_IMAGE_BASE_URL + movie.poster_path}
            title={movie.title}
            overview={movie.overview}
            voteAverage={movie.vote_average}
          />
        )}
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
