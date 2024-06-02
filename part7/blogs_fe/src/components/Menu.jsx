import { Link } from 'react-router-dom'
import { Nav, Button, Navbar, Container } from 'react-bootstrap'

const Menu = ({ user, handleLogout }) => {
  const padding = {
    paddingRight: 7,
    paddingLeft: 15,
  }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand>Blog app</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link style={padding} as={Link} to="/">
              blogs
            </Nav.Link>
            <Nav.Link style={padding} as={Link} to="/users">
              users
            </Nav.Link>
            <Nav.Link style={padding} as={Link} to="/create">
              create
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{user.name} logged in</Navbar.Text>
            <span style={padding}>
              <Button variant="outline-secondary" onClick={handleLogout}>
                logout
              </Button>
            </span>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu
