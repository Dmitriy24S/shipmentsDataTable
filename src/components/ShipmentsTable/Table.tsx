import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { toast } from 'react-hot-toast'

import { toggleSort } from '../../store/filters/filtersSlice'
import { SortingType } from '../../store/filters/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectFilteredShipments } from '../../store/shipments/selectors'
import { deleteShipment } from '../../store/shipments/shipmentsSlice'
import { RootState } from '../../store/store'
import ConfirmDeleteModal from '../Modal/Modal'
import TableItemRow from './TableItemRow/TableItemRow'
import SortButton from './TableSortButton/TableSortButton'

import styles from './Table.module.scss'

export interface IShipmentsData {
  orderNo: string
  date: string
  customer: string
  trackingNo: string
  status: string
  consignee: string
}

const ShipmentsTable = () => {
  const dispatch = useAppDispatch()
  const sortingType = useAppSelector((state: RootState) => state.filters.activeSort)
  const filteredData = useAppSelector(selectFilteredShipments) // ! empty logs?
  const [showModal, setShowModal] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)

  const toggleTableSort = (sortName: SortingType) => dispatch(toggleSort(sortName))

  const toggleModal = () => setShowModal((prev) => !prev)

  const handleSelectToDelete = (orderNo: string) => {
    setOrderToDelete(orderNo)
    setShowModal(true)
  }

  const handleDeleteShipment = () => {
    if (!orderToDelete) return
    dispatch(deleteShipment(orderToDelete))
    toast.success('Shipment deleted')
    setShowModal(false)
    setOrderToDelete(null) // reset
  }

  return (
    <>
      <Table responsive className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className='text-nowrap'>Order No.</th>
            <th className='text-nowrap'>Delivery Data</th>
            <th
              className='text-nowrap pointer'
              onClick={() => toggleTableSort('customer')}
            >
              Customer
              <SortButton
                sortingType={sortingType}
                sortTypeName={'customer'}
                onClick={(e) => {
                  e.stopPropagation() // Prevents the click event from propagating to the parent element
                  toggleTableSort('customer')
                }}
              />
            </th>
            <th
              className='text-nowrap pointer'
              onClick={() => toggleTableSort('trackingNo')}
            >
              Tracking No.
              <SortButton
                sortingType={sortingType}
                sortTypeName={'trackingNo'}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleTableSort('trackingNo')
                }}
              />
            </th>
            <th className='text-nowrap pointer' onClick={() => toggleTableSort('status')}>
              Status
              <SortButton
                sortingType={sortingType}
                sortTypeName={'status'}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleTableSort('status')
                }}
              />
            </th>
            <th
              className='text-nowrap pointer'
              onClick={() => toggleTableSort('consignee')}
            >
              Consignee
              <SortButton
                sortingType={sortingType}
                sortTypeName={'consignee'}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleTableSort('consignee')
                }}
              />
            </th>
            <th>{/* Actions / Buttons column */}</th>
          </tr>
        </thead>

        <tbody>
          {/* Filtered Thunk data */}
          {filteredData?.map((item) => (
            <TableItemRow
              key={item.orderNo}
              item={item}
              handleSelectToDelete={handleSelectToDelete}
            />
          ))}
        </tbody>
      </Table>

      <ConfirmDeleteModal
        showModal={showModal}
        toggleModal={toggleModal}
        onConfirm={handleDeleteShipment}
        orderNo={orderToDelete}
      />
    </>
  )
}

export default ShipmentsTable

// MISC.

// v1. Thunk data version
// const status = useAppSelector((state) => state.shipments.status)
// const shipmentsThunkData = useAppSelector((state) => state.shipments.shipments)
// {shipmentsThunkData?.map */}

// v2. RTK Query data version
// const { data: shipmentsRTKQueryData, isLoading, error } = useGetShipmentsDataQuery()
// {shipmentsRTKQueryData?.map

// RTK Query || Thunk loading message
// if (isLoading || status === 'loading') {
//   return (
//     <>
//       <div>Loading...</div>
//     </>
//   )
// }

// RTK Query error message:
// if (error) {
//   if ('status' in error) {
//     // you can access all properties of `FetchBaseQueryError` here
//     const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

//     return (
//       <div>
//         <div>An error has occurred:</div>
//         <div>{errMsg}</div>
//       </div>
//     )
//   } else {
//     // you can access all properties of `SerializedError` here
//     return <div>{error.message}</div>
//   }
// }
