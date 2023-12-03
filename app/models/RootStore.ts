import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { WatchListStoreModel } from "./WatchListStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  watchListStore: types.optional(WatchListStoreModel, {
    movies: [],
  }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
