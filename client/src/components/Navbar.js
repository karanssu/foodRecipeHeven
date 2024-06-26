import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { UserContext } from "../App";
import { removeUser } from "../utilities/userTokenManager";

const NavBar = () => {
	const [user, setUser] = useContext(UserContext);
	const navigate = useNavigate();

	const logout = () => {
		removeUser();
		setUser(null);
		navigate("/");
	};

	return (
		<Navbar variant="dark" expand="lg" className="navbar">
			<Container className="navbar-container">
				<Navbar.Brand className="mx-3 mx-md-0" as={Link} to="/">
					<img
						src={logoImg}
						width="50"
						height="50"
						className="d-inline-block align-top"
						alt="Logo"
						style={{ margin: 0 }}
					/>
				</Navbar.Brand>
				{user && (
					<Nav className="me-right mx-3 mx-md-0">
						<Nav.Link>
							<Image
								src={profileImg}
								width="40"
								height="40"
								roundedCircle
								alt="Profile"
								onClick={logout}
							/>
						</Nav.Link>
					</Nav>
				)}

				{!user && (
					<Navbar.Toggle
						className="navbar-toogle-btn"
						aria-controls="basic-navbar-nav"
					/>
				)}
				{!user && (
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
							{!user && (
								<Button
									className="nav-btn login-btn mx-md-2 flex-row-reverse"
									variant="outline-light"
									as={Link}
									to="/login"
								>
									Login
								</Button>
							)}
							{!user && (
								<Button
									className="nav-btn signup-btn my-3 my-md-0 mt-1 mt-md-0 flex-row-reverse"
									variant="outline-light"
									as={Link}
									to="/signup"
								>
									Sign Up
								</Button>
							)}
						</Nav>
					</Navbar.Collapse>
				)}
			</Container>
		</Navbar>
	);
};

export default NavBar;
