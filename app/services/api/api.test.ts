// Mock the config module before any other imports so the env var guard never fires
jest.mock("../../config", () => ({
  __esModule: true,
  default: {
    API_URL: "https://api.themoviedb.org/3/",
    API_KEY: "test-api-key",
    exitRoutes: [],
  },
}))

// Mock axios entirely — avoids the expo/virtual/streams fetch adapter issue in Node
jest.mock("axios")

import axios from "axios"
import { Api } from "./api"
import { IMovie, IMoviesResponse } from "./api.types"
import { IMovieDetail } from "./entities"

// ---------------------------------------------------------------------------
// Axios mock setup
// ---------------------------------------------------------------------------

const mockedAxios = axios as jest.Mocked<typeof axios>

// We intercept axios.create so the Api class gets a mocked client instance
const mockGet = jest.fn()
mockedAxios.create.mockReturnValue({
  get: mockGet,
} as any)

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const makeMovie = (id = 1): IMovie => ({
  adult: false,
  backdrop_path: "/backdrop.jpg",
  genre_ids: [28],
  id,
  original_language: "en",
  original_title: `Movie ${id}`,
  overview: "Overview.",
  popularity: 99,
  poster_path: "/poster.jpg",
  release_date: "2024-01-01",
  title: `Movie ${id}`,
  video: false,
  vote_average: 7.0,
  vote_count: 500,
})

const makeMoviesResponse = (movies: IMovie[]): IMoviesResponse => ({
  page: 1,
  results: movies,
  total_pages: 1,
  total_results: movies.length,
})

const makeMovieDetail = (): IMovieDetail => ({
  adult: false,
  backdrop_path: "/backdrop.jpg",
  belongs_to_collection: null,
  budget: 0,
  genres: [{ id: 28, name: "Action" }],
  homepage: "",
  id: 42,
  imdb_id: "tt0000001",
  original_language: "en",
  original_title: "Test Detail",
  overview: "Detailed overview.",
  popularity: 80,
  poster_path: "/poster.jpg",
  production_companies: [],
  production_countries: [],
  release_date: "2024-01-01",
  revenue: 0,
  runtime: 120,
  spoken_languages: [],
  status: "Released",
  tagline: "",
  title: "Test Detail",
  video: false,
  vote_average: 8.0,
  vote_count: 1200,
  credits: { cast: [], crew: [] },
  videos: { results: [] },
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const axiosError = (status: number) => {
  const err = new Error(`Request failed with status ${status}`) as any
  err.isAxiosError = true
  err.response = { status }
  // Make axios.isAxiosError return true for this object
  mockedAxios.isAxiosError.mockImplementation((e) => e?.isAxiosError === true)
  return err
}

const axiosTimeoutError = () => {
  const err = new Error("timeout of 10000ms exceeded") as any
  err.isAxiosError = true
  err.code = "ECONNABORTED"
  err.response = undefined
  mockedAxios.isAxiosError.mockImplementation((e) => e?.isAxiosError === true)
  return err
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("Api.movies.search", () => {
  let api: Api

  beforeEach(() => {
    jest.clearAllMocks()
    api = new Api({ url: "https://api.example.com", timeout: 5000 })
  })

  it("resolves with the results array on a successful response", async () => {
    const movies = [makeMovie(1), makeMovie(2)]
    mockGet.mockResolvedValueOnce({ data: makeMoviesResponse(movies) })

    const result = await api.movies.search("inception")

    expect(result).toHaveLength(2)
    expect(result[0].id).toBe(1)
    expect(result[1].id).toBe(2)
  })

  it("throws 'not-found' on a 404 response", async () => {
    mockGet.mockRejectedValueOnce(axiosError(404))

    await expect(api.movies.search("nonexistent")).rejects.toThrow("not-found")
  })

  it("throws 'server' on a 500 response", async () => {
    mockGet.mockRejectedValueOnce(axiosError(500))

    await expect(api.movies.search("anything")).rejects.toThrow("server")
  })

  it("throws 'timeout' on a network timeout (ECONNABORTED)", async () => {
    mockGet.mockRejectedValueOnce(axiosTimeoutError())

    await expect(api.movies.search("anything")).rejects.toThrow("timeout")
  })
})

describe("Api.movies.getItemDetails", () => {
  let api: Api

  beforeEach(() => {
    jest.clearAllMocks()
    api = new Api({ url: "https://api.example.com", timeout: 5000 })
  })

  it("resolves with the full movie detail object on success", async () => {
    const detail = makeMovieDetail()
    mockGet.mockResolvedValueOnce({ data: detail })

    const result = await api.movies.getItemDetails("42")

    expect(result.id).toBe(42)
    expect(result.title).toBe("Test Detail")
    expect(result.credits).toBeDefined()
    expect(result.videos).toBeDefined()
  })
})

describe("Api.movies.getHomeItemsByCategory", () => {
  let api: Api

  beforeEach(() => {
    jest.clearAllMocks()
    api = new Api({ url: "https://api.example.com", timeout: 5000 })
  })

  it("returns 4 categories and slices topRated/upcoming/nowPlaying to 6 items", async () => {
    // Build a response with 10 movies for each non-popular category
    const ten = Array.from({ length: 10 }, (_, i) => makeMovie(i + 1))
    const popular = Array.from({ length: 5 }, (_, i) => makeMovie(100 + i))

    mockGet
      .mockResolvedValueOnce({ data: makeMoviesResponse(popular) }) // popular
      .mockResolvedValueOnce({ data: makeMoviesResponse(ten) }) // top_rated
      .mockResolvedValueOnce({ data: makeMoviesResponse(ten) }) // upcoming
      .mockResolvedValueOnce({ data: makeMoviesResponse(ten) }) // now_playing

    const result = await api.movies.getHomeItemsByCategory(1)

    expect(result.popular).toHaveLength(5) // not sliced
    expect(result.topRated).toHaveLength(6) // sliced to 6
    expect(result.upcoming).toHaveLength(6) // sliced to 6
    expect(result.nowPlaying).toHaveLength(6) // sliced to 6
  })
})
