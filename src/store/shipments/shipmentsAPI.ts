import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IShipmentsData } from './types'

export const shipmentsAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getShipmentsData: builder.query<IShipmentsData[], void>({
      // query: () => '/shipments.json?key=5e0b62d0',
      query: () => 'temp',
    }),
  }),
})

export const { useGetShipmentsDataQuery } = shipmentsAPI
