import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ViewStyle } from "react-native"
import { EmptyStateFullScreen, FullScreenLoader, Screen, SearchBar } from "app/components"
import { TabScreenProps } from "app/navigators/RootNavigator"
import { HorizontalMovieCard } from "app/components/HorizontalMovieCard"
import { POSTER_IMAGE_BASE_URL } from "app/services/api/constants"
import { Spacings } from "react-native-ui-lib"
import { FlashList } from "@shopify/flash-list"
import { IMovie, api } from "app/services/api"
import { useNavigation } from "@react-navigation/native"
import debounce from "lodash.debounce"
import * as storage from "app/utils/storage"

interface SearchScreenProps extends TabScreenProps<"Search"> {}

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState<IMovie[]>([])
  const isFirstRender = useRef(true)

  const navigation = useNavigation()

  const onMoviePress = useCallback((movieID: number) => {
    // @ts-ignore TODO: fix this type error
    navigation.navigate("MovieDetails", { movieID })
  }, [])

  const debouncedSetQuery = useMemo(() => debounce(setQuery, 800), [])

  useEffect(() => {
    const tryToGetLocalMoviesByCategory = async () => {
      try {
        const localMovies = await storage.loadString("moviesByCategory")
        if (localMovies) {
          setMovies((JSON.parse(localMovies)?.upcoming ?? []) as IMovie[])
        }
      } catch {
        Alert.alert("Error", "Something went wrong, please try again later.")
      }
    }
    const fetchMovies = async () => {
      try {
        const movies = await api.movies.searchWith(query)
        setMovies(movies)
      } catch {
        Alert.alert("Error", "Something went wrong, please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    if (isFirstRender.current || (!isFirstRender.current && !query)) {
      tryToGetLocalMoviesByCategory()
      isFirstRender.current = false
    }

    if (query) {
      setIsLoading(true)
      fetchMovies()
    }
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [query])

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
    <Screen safeAreaEdges={["top"]} contentContainerStyle={$root} preset="fixed">
      <SearchBar onQueryChange={debouncedSetQuery} />
      {isLoading && <FullScreenLoader />}

      {!isLoading && (
        <FlashList
          data={movies}
          contentContainerStyle={{ paddingTop: Spacings.s10 * 1.2 }}
          renderItem={renderHorizontalMovieCard}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={180}
          ListEmptyComponent={() => (
            <EmptyStateFullScreen
              message="Oops! That option isn't available."
              imageID="not_found"
            />
          )}
        />
      )}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: Spacings.s3,
  paddingTop: Spacings.s5,
}
