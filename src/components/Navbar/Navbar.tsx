import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/esm/Button'
import { BsSearch } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'
import { InputGroup } from 'reactstrap'
// import { LinkContainer } from 'react-router-bootstrap'

import styles from './Navbar.module.scss'

const NavbarComponent = () => {
  return (
    <Navbar bg='light' expand={'lg'}>
      <Container>
        <Link to='/'>
          <Navbar.Brand>
            <img width='150' height='30' src='/logo.svg' alt='Kühne + Nagel logo' />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-lg`}
          className='focus-ring'
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement='end'
          responsive='lg'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className={`${styles.nav} justify-content-end flex-grow-1 pe-2`}>
              {/* <LinkContainer to='/'> */}
              <Nav.Link as={NavLink} to='/'>
                Home
              </Nav.Link>
              {/* </LinkContainer> */}
              <Nav.Link href='https://github.com/Dmitriy24S' target='_blank'>
                GitHub Profile
              </Nav.Link>
              <NavDropdown title='Settings' id={`offcanvasNavbarDropdown-expand-lg`}>
                <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
                <NavDropdown.Item href='#action4'>Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='#action5'>Something else here</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className='d-flex mt-4 mt-lg-0'>
              <InputGroup>
                <Form.Control
                  placeholder='Search'
                  aria-label='Search'
                  aria-describedby='Searchh'
                />
                <Button variant='outline-primary' className='border-secondary-subtle'>
                  <BsSearch />
                </Button>
              </InputGroup>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
