export const API_BASE_URL = "https://api.tmdb.org/"
export const IMAGE_API_BASE_URL = "https://image.tmdb.org/t/p/"

type PosterSize = "w185" | "w342" | "w500" | "original"

/**
 * Returns a fully-formed TMDB image URL for a given poster path and size.
 */
export const getPosterUrl = (path: string | null | undefined, size: PosterSize): string => {
  if (!path) return ""
  return `${IMAGE_API_BASE_URL}${size}${path}`
}
