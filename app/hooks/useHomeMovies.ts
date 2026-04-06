import { useQuery } from "@tanstack/react-query"
import { api } from "app/services/api"

export const HOME_MOVIES_QUERY_KEY = ["movies", "home"] as const

/**
 * Fetches all movie categories for the home screen.
 * Results are cached in memory for 5 minutes and persisted to
 * AsyncStorage for instant display on app relaunch.
 */
export const useHomeMovies = () => {
  return useQuery({
    queryKey: HOME_MOVIES_QUERY_KEY,
    queryFn: () => api.movies.getHomeItemsByCategory(1),
  })
}
