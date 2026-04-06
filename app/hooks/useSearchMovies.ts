import { useQuery } from "@tanstack/react-query"
import { api } from "app/services/api"

/**
 * Searches movies by query string.
 * Only fires when query is non-empty. Results are cached per query string.
 */
export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ["movies", "search", query],
    queryFn: () => api.movies.search(query),
    enabled: !!query,
  })
}
