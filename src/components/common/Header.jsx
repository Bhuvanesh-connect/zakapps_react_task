import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './../../app.module.scss';

const Header = () => {
  return (
    <Navbar bg="light" variant="light" className={styles.header}>
        <Navbar.Brand href="/" className={styles.brandName}>React Store</Navbar.Brand>
        <Nav>
          <Nav.Link
            as={NavLink}
            to="/products"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Products
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/admin"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Admin
          </Nav.Link>
        </Nav>
    </Navbar>
  );
};

export default Header;
