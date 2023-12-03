/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApiResponse as APIResponse, ApiOkResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { IMovieDetail } from "./entities"
import { getGeneralAPIProblem } from "./apiProblem"

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
    getByCategory: () => [],
    searchWith: () => [],
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
