import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import localData from '../../data/data.json'

import { IShipmentsData, IShipmentsState } from './types'

export const fetchShipmentsData = createAsyncThunk(
  'shipments/fetchShipmentsData',
  async () => {
    const { data } = await axios.get<IShipmentsData[]>(
      // `temp`
      `${process.env.REACT_APP_API_URL}/shipments.json?key=5e0b62d0`
    )
    console.log('fetchShipmentsData - thunk data:', data)
    return data
  }
)

const initialState: IShipmentsState = {
  shipments: [],
  status: 'idle',
}

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    deleteShipment: (state, action: PayloadAction<string>) => {
      const orderNo = action.payload
      state.shipments = state.shipments.filter((shipment) => shipment.orderNo !== orderNo)
    },
    updateShipment: (state, action: PayloadAction<IShipmentsData>) => {
      const updatedShipment = action.payload
      state.shipments = state.shipments.map((shipment) => {
        if (shipment.orderNo === updatedShipment.orderNo) {
          return updatedShipment
        }
        return shipment
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShipmentsData.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchShipmentsData.fulfilled, (state, action) => {
      state.status = 'idle'
      state.shipments = action.payload
    })
    builder.addCase(fetchShipmentsData.rejected, (state, action) => {
      state.status = 'error'
      state.shipments = localData // use offline local data as fallback if/when api has exceeded requests
    })
  },
})

export const { deleteShipment, updateShipment } = shipmentsSlice.actions
