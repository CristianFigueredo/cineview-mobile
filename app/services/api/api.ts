/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse as APIResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig, IMovie, IMoviesResponse } from "./api.types"
import { IMovieDetail } from "./entities"
import { getGeneralAPIProblem } from "./apiProblem"
import { MoviesState as IMoviesByCategory } from "app/screens"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Config.API_KEY}`,
      },
    })
  }

  movies = {
    getDetailsWith: async (id: string): Promise<IMovieDetail> => {
      const response: APIResponse<IMovieDetail> = await this.apisauce.get(`movie/${id}`, {
        append_to_response: "videos,credits",
        language: "en-US",
      })

      if (!response.ok) {
        const problem = getGeneralAPIProblem(response)
        if (problem) {
          throw new Error(problem.kind)
        }
      }

      if (!response.data) {
        throw new Error("errors.no_data")
      }
      return response.data
    },
    getAllByCategory: async (page: number): Promise<IMoviesByCategory> => {
      const getMoviesByCategory = async (
        category: "upcoming" | "top_rated" | "popular" | "now_playing",
      ) => {
        const response: APIResponse<IMoviesResponse> = await this.apisauce.get(
          "movie/" + category,
          {
            page,
            language: "en-US",
          },
        )
        return response
      }

      const responses = await Promise.all([
        getMoviesByCategory("popular"),
        getMoviesByCategory("top_rated"),
        getMoviesByCategory("upcoming"),
        getMoviesByCategory("now_playing"),
      ])

      if (!responses.every((response) => response?.ok)) {
        const problem = getGeneralAPIProblem(responses.filter((response) => !response.ok)[0])
        if (problem) {
          throw new Error(problem.kind)
        }
      }

      if (!responses.every((response) => !!response?.data)) {
        throw new Error("errors.no_data")
      }
      return {
        popular: responses[0]?.data?.results ?? [],
        topRated: responses[1]?.data?.results.slice(0, 6) ?? [],
        upcoming: responses[2]?.data?.results.slice(0, 6) ?? [],
        nowPlaying: responses[3]?.data?.results.slice(0, 6) ?? [],
      }
    },
    searchWith: async (query: string): Promise<IMovie[]> => {
      const response: APIResponse<IMoviesResponse> = await this.apisauce.get("search/movie", {
        query,
        language: "en-US",
        page: 1,
      })

      if (!response.ok) {
        const problem = getGeneralAPIProblem(response)
        if (problem) {
          throw new Error(problem.kind)
        }
      }

      if (!response.data) {
        throw new Error("errors.no_data")
      }
      return response.data.results
    },
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
