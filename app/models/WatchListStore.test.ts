import { WatchListStoreModel } from "./WatchListStore"
import { IMovie } from "app/services/api/api.types"

// ---------------------------------------------------------------------------
// Shared fixture
// ---------------------------------------------------------------------------

const makeMovie = (overrides: Partial<IMovie> = {}): IMovie => ({
  adult: false,
  backdrop_path: "/backdrop.jpg",
  genre_ids: [28, 12],
  id: 1,
  original_language: "en",
  original_title: "Test Movie",
  overview: "A test movie overview.",
  popularity: 100,
  poster_path: "/poster.jpg",
  release_date: "2024-01-01",
  title: "Test Movie",
  video: false,
  vote_average: 7.5,
  vote_count: 1000,
  ...overrides,
})

const createStore = () => WatchListStoreModel.create({ movies: [] })

// ---------------------------------------------------------------------------
// addMovieToWatchList
// ---------------------------------------------------------------------------

describe("addMovieToWatchList", () => {
  it("adds a movie to an empty watchlist", () => {
    const store = createStore()
    store.addMovieToWatchList(makeMovie({ id: 1 }))

    expect(store.movies).toHaveLength(1)
  })

  it("stores all movie fields correctly", () => {
    const store = createStore()
    const movie = makeMovie({ id: 42, title: "Inception", vote_average: 8.8 })
    store.addMovieToWatchList(movie)

    const stored = store.movies[0]
    expect(stored.id).toBe(42)
    expect(stored.title).toBe("Inception")
    expect(stored.vote_average).toBe(8.8)
  })

  it("can hold multiple movies", () => {
    const store = createStore()
    store.addMovieToWatchList(makeMovie({ id: 1 }))
    store.addMovieToWatchList(makeMovie({ id: 2, title: "Movie 2" }))
    store.addMovieToWatchList(makeMovie({ id: 3, title: "Movie 3" }))

    expect(store.movies).toHaveLength(3)
  })
})

// ---------------------------------------------------------------------------
// removeMovieFromWatchList
// ---------------------------------------------------------------------------

describe("removeMovieFromWatchList", () => {
  it("removes the correct movie by id", () => {
    const store = createStore()
    store.addMovieToWatchList(makeMovie({ id: 1 }))
    store.addMovieToWatchList(makeMovie({ id: 2, title: "Movie 2" }))

    store.removeMovieFromWatchList(1)

    expect(store.movies).toHaveLength(1)
    expect(store.movies[0].id).toBe(2)
  })

  it("is a no-op when the movie id does not exist", () => {
    const store = createStore()
    store.addMovieToWatchList(makeMovie({ id: 1 }))

    // Should not throw and should leave the list unchanged
    expect(() => store.removeMovieFromWatchList(999)).not.toThrow()
    expect(store.movies).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// isMovieInWatchList
// ---------------------------------------------------------------------------

describe("isMovieInWatchList", () => {
  it("returns true for a movie that was added", () => {
    const store = createStore()
    store.addMovieToWatchList(makeMovie({ id: 7 }))

    expect(store.isMovieInWatchList(7)).toBe(true)
  })

  it("returns false for a movie that was not added", () => {
    const store = createStore()

    expect(store.isMovieInWatchList(99)).toBe(false)
  })

  it("returns false after the movie has been removed", () => {
    const store = createStore()
    store.addMovieToWatchList(makeMovie({ id: 5 }))
    store.removeMovieFromWatchList(5)

    expect(store.isMovieInWatchList(5)).toBe(false)
  })
})
