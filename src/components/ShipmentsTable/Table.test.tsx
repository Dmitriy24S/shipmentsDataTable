import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import { filtersSlice } from '../../store/filters/filtersSlice'
import { shipmentsSlice } from '../../store/shipments/shipmentsSlice'
import { Status } from '../../store/shipments/types'

import ShipmentsTable from './Table'

const mockInitialState = {
  filters: {
    activeSort: null,
    sortDirection: null,
  },
  shipments: {
    shipments: {
      'zz-450581-11385595-4210084': {
        orderNo: 'zz-450581-11385595-4210084',
        date: '10/16/2019',
        customer: 'NXP Semiconductors N.V.',
        trackingNo: 'TP-724057-72553473-5647860',
        status: "'In Transit'",
        consignee: 'Koppers Holdings Inc.',
      },
      'kk-275651-64476049-3346442': {
        orderNo: 'kk-275651-64476049-3346442',
        date: '8/20/2019',
        customer: 'Triumph Bancorp, Inc.',
        trackingNo: 'TP-011637-13598236-2700556',
        status: "'Delivered'",
        consignee: 'Celsius Holdings, Inc.',
      },
    },
    status: 'idle' as Status,
  },
}

const store = configureStore({
  reducer: {
    shipments: shipmentsSlice.reducer,
    filters: filtersSlice.reducer,
  },
  preloadedState: mockInitialState, // Provide the mocked initial state
})

test('renders Table with no data', () => {
  const emptyInitialStore = {
    filters: {
      activeSort: null,
      sortDirection: null,
    },
    shipments: {
      shipments: {},
      status: 'idle' as Status,
    },
  }

  const emptyStore = configureStore({
    reducer: {
      shipments: shipmentsSlice.reducer,
      filters: filtersSlice.reducer,
    },
    preloadedState: emptyInitialStore, // Provide the mocked initial state
  })

  render(
    <Provider store={emptyStore}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ShipmentsTable />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )
  const tableHeaderText = screen.getByText(/Delivery Date/i)
  expect(tableHeaderText).toBeInTheDocument()

  const noDataText = screen.getByText(/No items to display/i)
  expect(noDataText).toBeInTheDocument()
})

test('renders Table with data', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ShipmentsTable />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )

  const tableItemText = screen.getByText(/Koppers Holdings Inc./i)
  expect(tableItemText).toBeInTheDocument()
})

test('clicking Sort By Consignee sorts Table by Consignee', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ShipmentsTable />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )

  const consigneeSortButton = screen.getByTitle(/Sort by consignee/i)
  expect(consigneeSortButton).toBeInTheDocument()

  const consigneesBeforeSort = screen.getAllByTestId('consignee')
  const firstConsigneeBeforeSort = consigneesBeforeSort[0].textContent // Koppers Holdings Inc.

  // Click sort button
  fireEvent.click(consigneeSortButton)

  // Wait for the table to update
  // const consigneesAfterSort = await screen.getAllByTestId('consignee')
  const consigneesAfterSort = screen.getAllByTestId('consignee')
  const firstConsigneeAfterSort = consigneesAfterSort[0].textContent // Celsius Holdings, Inc.

  // Assert that the first consignee cell has changed after sorting
  expect(firstConsigneeBeforeSort).not.toBe(firstConsigneeAfterSort)
})

test('clicking Delete Shipment button deletes Shipment row', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ShipmentsTable />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )

  // const firstShipmentRowBeforeDeletion = screen.getAllByLabelText('shipment row')[0]
  const firstShipmentRowBeforeDeletion = screen.getAllByTestId('shipment-row')[0]

  const deleteFirstShipmentButton = screen.getAllByLabelText(/Delete Shipment/i)[0]

  expect(deleteFirstShipmentButton).toBeInTheDocument()

  // Click delete first row button
  fireEvent.click(deleteFirstShipmentButton)

  // Confirmation modal
  const confirmDeleteButton = screen.getByLabelText('confirm delete')
  expect(confirmDeleteButton).toBeInTheDocument()

  // Click confirm delete
  fireEvent.click(confirmDeleteButton)

  // Wait for the table to update
  const firstShipmentRowAfterDeletion = await screen.getAllByTestId('shipment-row')[0]

  // Assert that the first shipment row has changed after deletion
  expect(firstShipmentRowBeforeDeletion).not.toBe(firstShipmentRowAfterDeletion)
})

test('clicking View Details button opens Shipment Details Page / url', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ShipmentsTable />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  )

  const firstShipmentId = screen.getAllByTestId('orderNo')[0].textContent as string
  expect(typeof firstShipmentId === 'string').toBe(true)

  const viewFirstRowShipmentDetailsButton = screen.getAllByLabelText(/View Details/i)[0]

  // const pageURLBeforeClick = window.location.href // http://localhost/

  expect(viewFirstRowShipmentDetailsButton).toBeInTheDocument()

  // Click view details of first shipment
  fireEvent.click(viewFirstRowShipmentDetailsButton)

  const pageURLAfterClick = window.location.href // http://localhost/zz-450581-11385595-4210084

  expect(pageURLAfterClick.includes(firstShipmentId)).toBe(true)

  // Details component
  // const shipmentDetailsTitle = screen.getByText(/shipment details./i)
  // expect(shipmentDetailsTitle).toBeInTheDocument()
})
