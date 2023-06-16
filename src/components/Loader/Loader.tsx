import { Spinner } from 'react-bootstrap'
// import { Spinner } from 'reactstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='primary' // react-bootstrap
      // color='primary' // reactstrap
      className='mx-auto d-block my-5'
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}

export default Loader
