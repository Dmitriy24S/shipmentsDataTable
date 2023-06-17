import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { IoMdCheckmark } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IShipmentsData, Status } from '../../store/shipments/types'
import { RootState } from '../../store/store'
import Loader from '../Loader/Loader'

import { updateShipment } from '../../store/shipments/shipmentsSlice'

import styles from './ShipmentDetails.module.scss'

// TODO: validate zod/yup form format, i.e. date?
// TODO: Status input - Select dropdown for limited options?
// TODO: debounce on change save form inputs vs save button?

const ShipmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const shipmentsData = useAppSelector((state: RootState) => state.shipments.shipments)
  const [shipment, setShipment] = useState<IShipmentsData | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [detailsChanged, setDetailsChanged] = useState(false)
  const [formState, setFormState] = useState<IShipmentsData>({
    orderNo: shipment?.orderNo || '',
    date: shipment?.date || '',
    customer: shipment?.customer || '',
    trackingNo: shipment?.trackingNo || '',
    consignee: shipment?.consignee || '',
    status: shipment?.status || '',
  })

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!shipment) return
    const { name, value } = e.target
    setDetailsChanged(true)

    const updatedShipmentForm = { ...formState, [name]: value } // in sync?
    console.log('updatedShipmentForm', updatedShipmentForm)

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCancelChanges = () => {
    setDetailsChanged(false)
    if (shipment) {
      setFormState(shipment) // reset form to initial state before input changes
    }
  }

  const handleConfirmChanges = () => {
    toast.success('Changes saved')
    dispatch(updateShipment(formState))
    setDetailsChanged(false)
  }

  // Find shipment details
  useEffect(() => {
    if (!id && !shipmentsData) return

    setStatus('loading')
    const data = shipmentsData.find((shipment) => shipment.orderNo === id)

    if (data) {
      setShipment(data)
      // console.log('shipment data:', data)
      setFormState(data)
      setStatus('idle')
    } else {
      setStatus('error')
    }
  }, [id, shipmentsData])

  // v2. redirect
  useEffect(() => {
    if (!id && !shipmentsData) return // wait until have data

    // if not found shipment -> redirect
    if (!shipment && status === 'error') {
      toast.error('No matching shipment number')
      return navigate('/')
    }
  }, [status, shipment, shipmentsData, navigate, id])

  // v1. redirect
  // if (!shipment && status === 'error') {
  // toast.error('No matching shipment number') // shows up 2x times - StrictMode?
  // return <Navigate to='/' />
  // }

  if (status === 'loading') {
    return <Loader />
  }

  return (
    <Card className={`${styles.detailsCard}`} bg='light' border='light'>
      <Card.Header className='py-4 bg-light border-bottom border-secondary-sublte'></Card.Header>
      <Card.Body className='mb-5'>
        <h4 className='text-uppercase mb-4'>Shipment Details</h4>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for='orderNo'>Order No.</Label>
                <Input
                  id='orderNo'
                  name='orderNo'
                  placeholder='e.g. zz-450581-1138559'
                  type='text'
                  value={formState.orderNo}
                  disabled
                  // onChange={handleValueChange} // keep id static -> update shipments by id?
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='date'>Date</Label>
                <Input
                  id='date'
                  name='date'
                  placeholder='e.g. 9/22/2019'
                  type='text'
                  value={formState.date}
                  onChange={handleValueChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for='customer'>Customer</Label>
                <Input
                  id='customer'
                  name='customer'
                  placeholder='e.g. John Doe'
                  type='text'
                  value={formState.customer}
                  onChange={handleValueChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for='trackingNo'>Tracking No.</Label>
                <Input
                  id='trackingNo'
                  name='trackingNo'
                  placeholder='e.g. TP-86544-40241948'
                  type='text'
                  value={formState.trackingNo}
                  onChange={handleValueChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for='consignee'>Consignee</Label>
                <Input
                  id='consignee'
                  name='consignee'
                  placeholder='e.g. Capital City Bank Group'
                  type='text'
                  value={formState.consignee}
                  onChange={handleValueChange}
                />
              </FormGroup>
            </Col>
            {/* // TODO: Status input - Select dropdown for limited options?  */}
            <Col md={6}>
              <FormGroup>
                <Label for='status'>Status</Label>
                <Input
                  id='status'
                  name='status'
                  placeholder='e.g. In Transit'
                  type='text'
                  value={formState.status}
                  onChange={handleValueChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={`${styles.buttonsContainer} mt-4`}>
            <Col className='d-flex justify-content-end align-items-center gap-4'>
              {detailsChanged && (
                <>
                  <Button
                    type='button'
                    color='danger'
                    title='Cancel Changes'
                    className='py-2'
                    onClick={handleCancelChanges}
                  >
                    <IoCloseSharp /> Cancel Changes
                  </Button>
                  <Button
                    type='button'
                    color='success'
                    title='Save Changes'
                    className='py-2'
                    onClick={handleConfirmChanges}
                  >
                    <IoMdCheckmark /> Save Changes
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ShipmentDetails
