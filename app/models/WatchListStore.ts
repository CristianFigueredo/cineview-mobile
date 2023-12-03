import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { IMovie } from "app/services/api/api.types"

export const MovieModel = types.model("Movie").props({
  adult: types.boolean,
  backdrop_path: types.maybeNull(types.string),
  genre_ids: types.array(types.number),
  id: types.identifierNumber,
  original_language: types.string,
  original_title: types.string,
  overview: types.string,
  popularity: types.number,
  poster_path: types.string,
  release_date: types.string,
  title: types.string,
  video: types.boolean,
  vote_average: types.number,
  vote_count: types.number,
})

export const WatchListStoreModel = types
  .model("WatchListStore")
  .props({
    movies: types.array(MovieModel),
  })
  .views((store) => ({
    isMovieInWatchList(movieId: number) {
      return store.movies.some((movie) => movie.id === movieId)
    },
  }))
  .actions((store) => ({
    addMovieToWatchList(movieData: IMovie) {
      const newMovie = MovieModel.create(movieData)
      store.movies.push(newMovie)
    },
    removeMovieFromWatchList(movieId: number) {
      const index = store.movies.findIndex((movie) => movie.id === movieId)
      if (index !== -1) {
        store.movies.splice(index, 1)
      }
    },
  }))

export interface WatchListStore extends Instance<typeof WatchListStoreModel> {}
export interface WatchListStoreSnapshot extends SnapshotOut<typeof WatchListStoreModel> {}
