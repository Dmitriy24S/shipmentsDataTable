import { createSlice } from '@reduxjs/toolkit'

import { IFilterState, SortingType } from './types'

import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IFilterState = {
  activeSort: null,
  sortDirection: null,
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleSort: (state, action: PayloadAction<SortingType>) => {
      const selectedSort = action.payload
      state.activeSort = selectedSort
      if (state.sortDirection === 'DESC') {
        state.sortDirection = 'ASC'
      } else if (state.sortDirection === 'ASC') {
        state.sortDirection = 'DESC'
      } else if (state.sortDirection === null) {
        state.sortDirection = 'ASC'
      }
    },
  },
})

export const { toggleSort } = filtersSlice.actions
