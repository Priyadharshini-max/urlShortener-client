import React from "react"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavbarComponent() {
    const profileIcon = (<i className="fas fa-user-circle"></i>);
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>URL Shortener</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/createurl">CreateShortURL</Nav.Link>
                        <Nav.Link as={Link} to="/displayurl">DisplayAllShortURL</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={profileIcon} id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/profile">{localStorage.getItem("user")}</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/forgotpassword">Change Password</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/login" onClick={() => localStorage.clear()}><i className="fa fa-sign-out fa-fw"></i> Sign out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};


export default NavbarComponent;