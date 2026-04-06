import { useQuery } from "@tanstack/react-query"
import { api } from "app/services/api"

/**
 * Fetches full movie details including videos and credits.
 * Results are cached per movie ID and persisted to AsyncStorage.
 */
export const useMovieDetails = (movieID: string) => {
  return useQuery({
    queryKey: ["movies", "details", movieID],
    queryFn: () => api.movies.getItemDetails(movieID),
    enabled: !!movieID,
  })
}
