import { FallbackProps } from 'react-error-boundary'
import { Button, Container } from 'reactstrap'

const ErrorPage = (props: FallbackProps) => {
  const { resetErrorBoundary } = props

  return (
    <Container className='text-center pt-5'>
      <h2 className='mb-4'>Oops, something went wrong</h2>
      <Button onClick={resetErrorBoundary}>Reload page</Button>
    </Container>
  )
}

export default ErrorPage
