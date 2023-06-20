import { useState } from 'react'
import Table from 'react-bootstrap/Table'
import { toast } from 'react-hot-toast'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

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

const ShipmentsTable = () => {
  const dispatch = useAppDispatch()
  const sortingType = useAppSelector((state: RootState) => state.filters.activeSort)
  const filteredData = useAppSelector(selectFilteredShipments)
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

  // Pagination
  const itemsPerPage = 10 // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredData.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) {
      setCurrentPage(1) // Prevent going below the first page
    } else if (pageNumber > totalPages) {
      setCurrentPage(totalPages) // Prevent going above the last page
    } else {
      setCurrentPage(pageNumber)
    }
  }

  // Scroll to top on Table page change
  // useEffect(() => {
  //   window.scrollTo({ top: 0 })
  // }, [currentPage])

  return (
    <>
      <Table responsive className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={`text-nowrap ${styles['width-200']}`}>Order No.</th>
            <th className={`text-nowrap ${styles['width-120']}`}>Delivery Date</th>
            <th
              className={`text-nowrap pointer ${styles['width-200']}`}
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
              className={`text-nowrap pointer ${styles['width-200']}`}
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
            <th
              className={`text-nowrap pointer ${styles['width-80']}`}
              onClick={() => toggleTableSort('status')}
            >
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
              className={`text-nowrap pointer ${styles['width-200']}`}
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
            <th className={styles['width-80']}>{/* Actions / Buttons column */}</th>
          </tr>
        </thead>

        <tbody>
          {/* Filtered + Paginated Thunk data */}
          {!currentItems.length && (
            <tr>
              <td className='border-0'>
                <h4>No items to display</h4>
              </td>
            </tr>
          )}
          {currentItems?.map((item) => (
            <TableItemRow
              key={item.orderNo}
              item={item}
              handleSelectToDelete={handleSelectToDelete}
            />
          ))}
        </tbody>
      </Table>

      <Pagination className='my-3 d-flex justify-content-center'>
        {/* Prev */}
        <PaginationItem>
          <PaginationLink onClick={() => handlePageChange(currentPage - 1)} previous />
        </PaginationItem>
        {/* Pages */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index} active={index + 1 === currentPage}>
            <PaginationLink onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* Next */}
        <PaginationLink onClick={() => handlePageChange(currentPage + 1)} next />
      </Pagination>

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
// {shipmentsThunkData?.map

// Filtered Thunk data
// {filteredData?.map((item)

// v2. RTK Query data version
// const { data: shipmentsRTKQueryData, isLoading, error } = useGetShipmentsDataQuery()
// {shipmentsRTKQueryData?.map
