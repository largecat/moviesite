import React, { useContext } from 'react';
import './styles/Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserContext } from '../UserContext';

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <Navbar bg='dark' variant='dark' expand='md'>
      <LinkContainer to='/'>
        <Navbar.Brand>MovieSite</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />

      <Navbar.Collapse className='ms-auto' id='basic-navbar-nav'>
        <Nav className='ms-auto'>
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          <LinkContainer to='/popular'>
            <Nav.Link>Popular</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/search'>
            <Nav.Link>Search</Nav.Link>
          </LinkContainer>

          {!currentUser ? (
            <LinkContainer to='/signin'>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <LinkContainer to='/userhome'>
              <Nav.Link>{currentUser.displayName}'s profile</Nav.Link>
            </LinkContainer>
          )}
          {/* {user && (
            <LinkContainer to='/userhome'>
              <Nav.Link>{user.displayName}'s profile</Nav.Link>
            </LinkContainer>
          )} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
