import React, { Suspense, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { fetchShipmentsData } from './store/shipments/shipmentsSlice'
import { RootState } from './store/store'

const ShipmentsListPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ShipmentsListPage" */ './pages/ShipmentsList/ShipmentsListPage'
    )
)
const ShipmentDetailsPage = React.lazy(
  () =>
    import(
      /* webpackChunkName: "ShipmentDetailsPage" */ './pages/ShipmentDetails/ShipmentDetailsPage'
    )
)

// API:
// https://my.api.mockaroo.com/shipments.json?key=5e0b62d0
// { "error": "Free accounts are limited to 200 requests per day.  You can generate up to 1000000 records per day by upgrading to a Silver plan.  See http://www.mockaroo.com/api/docs for more information about usage limits." }

// TODO: Details - validate zod/yup form format, i.e. date?
// TODO: Details - Status input - Select dropdown for limited options?
// TODO: Details - debounce on change save form inputs vs save button?
// TODO: RTK Redux state make Normalized Data with ids?
// TODO: redux tests + other tests
// TODO: auto sort imports -> eslint?

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state: RootState) => state.shipments.status)

  // RTK Query version
  // const { data: shipmentsRTKQueryData, isLoading, error } = useGetShipmentsDataQuery()

  // Thunk version
  useEffect(() => {
    dispatch(fetchShipmentsData())
    // throw new Error('I crashed!') // test Error Boundary
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Toaster />
      <Container className='py-5 text-secondary'>
        {status === 'loading' ? (
          <Loader />
        ) : (
          <Routes>
            <Route
              path='/'
              element={
                <Suspense>
                  <ShipmentsListPage />
                </Suspense>
              }
            />
            <Route
              path='/:id'
              element={
                <Suspense>
                  <ShipmentDetailsPage />
                </Suspense>
              }
            />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        )}
      </Container>
    </>
  )
}

export default App
