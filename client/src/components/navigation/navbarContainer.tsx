import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUserContext } from '../../context/user';
import { Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const NavBar: FC = () => {
  const { profile } = useUserContext();
  return (
    <Navbar className='navbar navbar-light bg-light'>
      <Container>
        <Navbar.Brand href='#home'>ToDoList</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='navbarScroll'>
          <Nav>
            <NavLink eventKey='1' as={Link} to='/'>
              Home
            </NavLink>
            <NavLink eventKey='2' as={Link} to='/about'>
              About
            </NavLink>
            <NavLink eventKey='3' as={Link} to='/contact'>
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            Signed in as: <a href='#login'>{profile.username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
