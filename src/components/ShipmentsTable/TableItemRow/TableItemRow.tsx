import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/esm/Button'
import { IoCloseSharp } from 'react-icons/io5'
import { TbListDetails } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { UncontrolledTooltip } from 'reactstrap'

import { IShipmentsData } from '../../../store/shipments/types'

import styles from './TableItemRow.module.scss'

interface TableItemRowProps {
  item: IShipmentsData
  handleSelectToDelete: (orderNo: string) => void
}

const TableItemRow = ({ item, handleSelectToDelete }: TableItemRowProps) => {
  // const handleDeleteShipment = (orderNo: string) => {
  //   window.confirm('Are you sure you want to delete this shipment?') &&
  //     dispatch(deleteShipment(orderNo))
  // }

  return (
    <tr data-testid='shipment-row' className={styles.bodyRow}>
      <td data-testid='orderNo'>{item.orderNo}</td>
      <td>{item.date}</td>
      <td>{item.customer}</td>
      <td>{item.trackingNo}</td>
      <td>{item.status}</td>
      <td data-testid='consignee'>{item.consignee}</td>
      <td>
        <ButtonGroup>
          {/* View details link/button */}
          <Link
            role='button'
            aria-label='View Details'
            title='View Details'
            id={`view-${item.orderNo}`}
            className='btn btn-primary px-2 py-1 me-2 rounded'
            to={`/${item.orderNo}`}
          >
            <TbListDetails />
          </Link>
          <UncontrolledTooltip placement='top' target={`view-${item.orderNo}`}>
            View Details
          </UncontrolledTooltip>
          {/* Delete button */}
          <Button
            aria-label='Delete Shipment'
            id={`delete-${item.orderNo}`}
            variant='danger'
            className='px-2 py-1 rounded'
            title='Delete Shipment'
            onClick={() => handleSelectToDelete(item.orderNo)}
          >
            <IoCloseSharp />
          </Button>
          <UncontrolledTooltip placement='top' target={`delete-${item.orderNo}`}>
            Delete Shipment
          </UncontrolledTooltip>
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default TableItemRow
