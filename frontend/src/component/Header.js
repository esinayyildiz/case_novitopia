import React from 'react'
import { Button, Navbar,Nav, Form, Container, FormControl, NavDropdown } from 'react-bootstrap';
import '../my.css'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

function Header() {

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()

  const logoutHandler=()=>
  {
    dispatch(logout())
  }


  return (
    <div>
        <Navbar bg="white" expand="lg">
  <Container fluid>
    <Navbar.Brand className='nav-color' href="#">My site</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll >

<LinkContainer to="/">
<Nav.Link  className='nav-color'><i className="fa-solid fa-house"></i> Anasayfa</Nav.Link>  
</LinkContainer>

<LinkContainer to="/about">
<Nav.Link className='nav-color' ><i className="fa-solid fa-address-card"></i> Hakkımızda</Nav.Link>
</LinkContainer>

<LinkContainer to="/">

<Nav.Link className='nav-color' ><i className="fa fa-thin fa-building"></i> Kuruluşlar</Nav.Link>
</LinkContainer>

{userInfo ? (
  <NavDropdown className='nav-color' title="Hesabım">
     <LinkContainer to="/profile">
       <NavDropdown.Item className='nav-color'>Profil</NavDropdown.Item>
     </LinkContainer>
     <NavDropdown.Item  className='nav-color' onClick={logoutHandler}>Çıkış</NavDropdown.Item>


  </NavDropdown>

):
(

  <LinkContainer to="/Login">

<Nav.Link className='nav-color' href="#action2"><i className="fa-solid fa-user"></i> Üye girişi</Nav.Link>
</LinkContainer>



)}

{userInfo && userInfo.isAdmin && (
  <NavDropdown className='nav-color' title='Admin'  id='username'>
     <LinkContainer to="/admin/userlist">
       <NavDropdown.Item className='nav-color'>Kullanıcılar Listesi</NavDropdown.Item>
     </LinkContainer>
     <LinkContainer to="/admin/kuruluslist">
       <NavDropdown.Item className='nav-color'>Kuruluslar Listesi</NavDropdown.Item>
     </LinkContainer>

    

  </NavDropdown>

)}


      </Nav>
      <LinkContainer to="/takip">

<Nav.Link className='nav-color' href="#action2"><i className="fa fa-solid fa-check"></i> Takip ettiklerim</Nav.Link>
</LinkContainer>
    
      <Form className="d-flex">
        <FormControl
          type="search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="light">ARA</Button>
      </Form>
     
    </Navbar.Collapse>
  </Container>
</Navbar>



    </div>
    
  )
}

export default Header