import axios, { AxiosInstance } from "axios"
import Config from "../../config"
import type { ApiConfig, IMovie, IMoviesResponse, MoviesByCategory } from "./api.types"
import { IMovieDetail } from "./entities"
import { getGeneralAPIProblem } from "./apiProblem"

const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the TMDB API using axios.
 * Handles base URL composition, authentication headers, timeout,
 * and maps HTTP error codes to typed problem kinds.
 */
export class Api {
  private client: AxiosInstance

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.client = axios.create({
      baseURL: config.url,
      timeout: config.timeout,
      headers: {
        Accept: "application/json",
        // NOTE: Exposing this token client-side is not secure for production.
        // In a real app it should be proxied through a backend.
        Authorization: `Bearer ${Config.API_KEY}`,
      },
    })
  }

  /**
   * Makes an authenticated GET request to the API.
   * Automatically appends query params and throws a typed error on
   * non-2xx responses.
   */
  private async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response = await this.client.get<T>(path, { params })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const problem = getGeneralAPIProblem(error.response.status)
        throw new Error(problem?.kind ?? "unknown")
      }
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        throw new Error("timeout")
      }
      throw error
    }
  }

  movies = {
    /** Fetches full movie details including videos and credits. */
    getItemDetails: async (id: string): Promise<IMovieDetail> => {
      return this.get<IMovieDetail>(`movie/${id}`, {
        append_to_response: "videos,credits",
        language: "en-US",
      })
    },

    /** Fetches movies across all four categories in parallel for the home screen. */
    getHomeItemsByCategory: async (page: number): Promise<MoviesByCategory> => {
      const [popular, topRated, upcoming, nowPlaying] = await Promise.all([
        this.get<IMoviesResponse>("movie/popular", { page, language: "en-US" }),
        this.get<IMoviesResponse>("movie/top_rated", { page, language: "en-US" }),
        this.get<IMoviesResponse>("movie/upcoming", { page, language: "en-US" }),
        this.get<IMoviesResponse>("movie/now_playing", { page, language: "en-US" }),
      ])

      return {
        popular: popular.results,
        topRated: topRated.results.slice(0, 6),
        upcoming: upcoming.results.slice(0, 6),
        nowPlaying: nowPlaying.results.slice(0, 6),
      }
    },

    /** Searches movies by query string. */
    search: async (query: string): Promise<IMovie[]> => {
      const data = await this.get<IMoviesResponse>("search/movie", {
        query,
        language: "en-US",
        page: 1,
      })
      return data.results
    },
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
