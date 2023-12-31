import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-hot-toast'
import { IoMdCheckmark } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectShipments } from '../../store/shipments/selectors'
import { updateShipment } from '../../store/shipments/shipmentsSlice'
import { IShipmentsData, Status } from '../../store/shipments/types'
import Loader from '../Loader/Loader'

import styles from './ShipmentDetails.module.scss'

export interface IFormState extends IShipmentsData {
  formattedDate: Date
}

export const statusOptions = ['Shipped', 'In Transit', 'Delivered']

const ShipmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const shipmentsData = useAppSelector(selectShipments) // normalized data -> into array selector
  const [shipment, setShipment] = useState<IShipmentsData | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [detailsChanged, setDetailsChanged] = useState(false)
  const [formState, setFormState] = useState<IFormState>({
    orderNo: shipment?.orderNo || '',
    date: shipment?.date || format(new Date(), 'MM/dd/yyyy'), // Date in String format
    customer: shipment?.customer || '',
    trackingNo: shipment?.trackingNo || '',
    consignee: shipment?.consignee || '',
    status: shipment?.status || '',
    formattedDate: shipment?.date ? new Date(shipment.date) : new Date(), // Date
  })

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const handleDateChange = (date: Date | null, e: React.SyntheticEvent) => {
    if (!date) return
    setDetailsChanged(true)
    // formState {..., date: "10/16/2019"}
    // date Thu Oct 17 2019 00:00:00 GMT+0300 (Eastern European Summer Time)
    const formattedDateToStr = format(date, 'MM/dd/yyyy') // 10/17/2019

    setFormState((prevState) => ({
      ...prevState,
      date: formattedDateToStr,
      formattedDate: date,
    }))
  }

  const handleCancelChanges = () => {
    setDetailsChanged(false)
    if (shipment) {
      // reset form to initial state before input changes
      setFormState({
        ...shipment,
        formattedDate: shipment?.date ? new Date(shipment.date) : new Date(),
      })
    }
  }

  const handleConfirmChanges = () => {
    toast.success('Changes saved')
    const { formattedDate, ...shipmentData } = formState // exclude formattedDate in Date format, keep String format
    dispatch(updateShipment(shipmentData))
    setDetailsChanged(false)
  }

  // Find shipment details
  useEffect(() => {
    if (!id && !shipmentsData) return

    setStatus('loading')
    const data = shipmentsData.find((shipment) => shipment.orderNo === id)

    if (data) {
      setShipment(data)
      // console.log('shipmentsData data:', data)
      setFormState({
        ...data,
        formattedDate: data?.date ? new Date(data.date) : new Date(),
      })
      setStatus('idle')
    } else {
      setStatus('error')
    }
  }, [id, shipmentsData])

  // v2. redirect
  useEffect(() => {
    if (!id && !shipmentsData) return // wait until have data

    // if not found shipment -> redirect
    // ! when fetched Data from API instead of offline data -> always redirects, because API provides random ids(?) and on reload no matching id in data
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
                <DatePicker
                  id='date'
                  name='date'
                  autoComplete='off'
                  placeholderText='e.g. 09/22/2019'
                  dateFormat='MM/dd/yyyy'
                  selected={formState.formattedDate}
                  onChange={handleDateChange}
                  className={`${styles.dateInput} focus-ring`}
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
            <Col md={6}>
              <FormGroup>
                <Label for='status'>Status</Label>
                <Input
                  type='select'
                  id='status'
                  name='status'
                  aria-label='status'
                  onChange={handleValueChange}
                  value={formState.status}
                >
                  {statusOptions.map((option) => (
                    <option value={`'${option}'`} key={option}>
                      {`'${option}'`}
                    </option>
                  ))}
                </Input>
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
