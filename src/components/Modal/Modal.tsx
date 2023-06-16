import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

interface ModalProps {
  showModal: boolean
  toggleModal: () => void
  onConfirm: () => void
  orderNo: string | null
  // children: React.ReactNode
}

const ConfirmDeleteModal = ({
  showModal,
  toggleModal,
  onConfirm,
  orderNo,
}: ModalProps) => {
  return (
    <Modal isOpen={showModal} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Delete shipment</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this shipment?</p>
        <p>
          Shipment: <span className='fw-bold'>{orderNo} </span>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
        <Button color='danger' onClick={onConfirm}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmDeleteModal
