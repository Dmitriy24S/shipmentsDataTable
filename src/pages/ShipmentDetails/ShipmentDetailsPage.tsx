import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'

import ShipmentDetails from '../../components/ShipmentDetails/ShipmentDetails'

const ShipmentDetailsBreadcrumb = () => {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Link to='/'>Home</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>Shipment Details</BreadcrumbItem>
    </Breadcrumb>
  )
}

const ShipmentDetailsPage = () => {
  return (
    <>
      <ShipmentDetailsBreadcrumb />
      <ShipmentDetails />
    </>
  )
}

export default ShipmentDetailsPage
