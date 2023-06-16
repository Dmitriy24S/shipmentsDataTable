import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/esm/Button'
import { IoCloseSharp } from 'react-icons/io5'
import { TbListDetails } from 'react-icons/tb'
import { Link } from 'react-router-dom'

import { IShipmentsData } from '../Table'

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
    <tr className={styles.bodyRow}>
      <td>{item.orderNo}</td>
      <td>{item.date}</td>
      <td>{item.customer}</td>
      <td>{item.trackingNo}</td>
      <td>{item.status}</td>
      <td>{item.consignee}</td>
      <td>
        <ButtonGroup>
          <Link
            role='button'
            title='View Details'
            className='btn btn-primary px-2 py-1 me-2 rounded'
            to={`/${item.orderNo}`}
          >
            <TbListDetails />
          </Link>
          <Button
            variant='danger'
            className='px-2 py-1 rounded'
            title='Delete Shipment'
            onClick={() => handleSelectToDelete(item.orderNo)}
          >
            <IoCloseSharp />
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}

export default TableItemRow
