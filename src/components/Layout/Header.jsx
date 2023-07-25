import { useContext } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContex } from "../../context/AuthContex";

import "./main.scss";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContex);

  return (
    <header>
      <Navbar expand="md" className="pt-4 pb-4  navigate">
        <Container>
          <Navbar.Brand href="#">
            {isAuthenticated ? (
              <Link to="/my-posts">
                {" "}
                <h2 style={{ padding: 0, color: "#fff", margin: 0 }}>
                  My Blogs
                </h2>
              </Link>
            ) : (
              <Link>
                <img src="/navLogo.svg" alt="" />
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg bg-light"
            // aria-controls={`offcanvasNavbar-expand-md`}
          />
          <Navbar.Offcanvas
            className="bg-secondary"
            // aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                <Link></Link>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end align-items-center flex-grow-1 gap-3 pe-3">
                <Nav.Link href="#action1">
                  {" "}
                  <Link className="nav_title" to="/">
                    Home
                  </Link>
                </Nav.Link>
                <Nav.Link href="#action2">
                  {" "}
                  <Link className="nav_title" to="/all-posts">
                    Posts
                  </Link>
                </Nav.Link>
                <Nav.Link href="#action2">
                  {" "}
                  <Link className="nav_title" to="/about">
                    About Us
                  </Link>
                </Nav.Link>
                <Nav.Link href="#action2">
                  {" "}
                  <Link className="nav_title" to="/register">
                    Register
                  </Link>
                </Nav.Link>
                <Nav.Link href="#action2">
                  {" "}
                  <Button variant="light" className="nav_button">
                    {" "}
                    {!isAuthenticated ? (
                      <Link className="btn " to="login">
                        Login
                      </Link>
                    ) : (
                      "Account"
                    )}
                  </Button>{" "}
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
