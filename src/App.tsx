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

// TODO: Redux - refactor normalized data state with createEntityAdapter?

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
      <Container as={'main'} fluid='lg' className='py-5 text-secondary'>
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
