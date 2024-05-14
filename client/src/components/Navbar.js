import React from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	Nav,
	NavDropdown,
	Button,
	Image,
	Container,
} from "react-bootstrap";
import "./Navbar.css";
import logoImg from "../images/logo.png";
import profileImg from "../images/profile.png";

const NavBar = () => {
	const user = null;

	return (
		<Navbar variant="dark" expand="lg" className="navbar">
			<Container className="navbar-container">
				<Navbar.Brand as={Link} to="/">
					<img
						src={logoImg}
						width="50"
						height="50"
						className="d-inline-block align-top"
						alt="Logo"
						style={{ margin: 0 }}
					/>
				</Navbar.Brand>
				<Navbar.Toggle
					className="navbar-toogle-btn"
					aria-controls="basic-navbar-nav"
				/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{/* <Nav.Link as={Link} to="/home">
							Home
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item as={Link} to="/action1">
								Action 1
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/action2">
								Action 2
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item as={Link} to="/action3">
								Action 3
							</NavDropdown.Item> */}
						{/* </NavDropdown> */}
					</Nav>
					<Nav className="me-right">
						<Button
							className="nav-btn login-btn"
							variant="outline-light"
							as={Link}
							to="/login"
						>
							Login
						</Button>
						<Button
							className="nav-btn signup-btn my-sm-3 my-md-0"
							variant="outline-light"
							as={Link}
							to="/signup"
						>
							Sign Up
						</Button>
						{user && (
							<Nav.Link>
								<Image
									src={profileImg}
									width="30"
									height="30"
									roundedCircle
									alt="Profile"
								/>
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
