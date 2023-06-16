import { configureStore } from '@reduxjs/toolkit'
import { filtersSlice } from './filters/filtersSlice'
import { shipmentsAPI } from './shipments/shipmentsAPI'
import { shipmentsSlice } from './shipments/shipmentsSlice'

export const store = configureStore({
  reducer: {
    shipments: shipmentsSlice.reducer,
    [shipmentsAPI.reducerPath]: shipmentsAPI.reducer,
    filters: filtersSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(shipmentsAPI.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
