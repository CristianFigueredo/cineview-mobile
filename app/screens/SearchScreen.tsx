import React, { useCallback, useState, useRef } from "react"
import { ViewStyle } from "react-native"
import { EmptyState, LoadingIndicator, Screen, SearchBar, MovieCard } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"
import { IMovie } from "app/services/api"
import { getPosterUrl } from "app/services/api/constants"
import { useNavigation } from "@react-navigation/native"
import { useSearchMovies } from "app/hooks/useSearchMovies"

const DEBOUNCE_MS = 500

interface SearchScreenProps extends TabScreenProps<"Search"> {}

export const SearchScreen = (_: SearchScreenProps) => {
  const [query, setQuery] = useState("")
  const navigation = useNavigation()
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data: movies = [], isFetching, isError } = useSearchMovies(query)

  const onQueryChange = useCallback((text: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => setQuery(text), DEBOUNCE_MS)
  }, [])

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
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$root} preset="fixed">
      <SearchBar onQueryChange={onQueryChange} />
      {isFetching && <LoadingIndicator />}
      {!isFetching && (
        <FlashList
          data={movies}
          contentContainerStyle={{ paddingTop: Spacings.s10 * 1.2 }}
          renderItem={renderMovieCard}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            isError ? (
              <EmptyState message="Something went wrong. Please try again." variant="not_found" />
            ) : (
              <EmptyState message="Search for a movie..." variant="empty" />
            )
          }
        />
      )}
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: Spacings.s3,
  paddingTop: Spacings.s5,
}
