import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Header() {
    const isLogedIn = Cookies.get("token");
    const navigate = useNavigate();

    const hadelLogout = () => {
        Cookies.remove("token");
        navigate("/login", { replace: true });
    };

    return (
        <Navbar expand="lg" className="bg-dark shadow-sm">
            <Container className="bg-transparent" fluid>
                <Navbar.Brand
                    className="fw-bolder fs-3 bg-transparent text-white"
                    href="/"
                >
                    Todo App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" style={{ color: 'white', backgroundColor: 'white' }} />
                <Navbar.Collapse className="bg-transparent" id="navbarScroll" style={{ color: 'white', backgroundColor: 'white' }}>
                    <Nav
                        className="m-auto my-2 my-lg-0 gap-4 fw-bold bg-transparent"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >

                    </Nav>
                    {isLogedIn ? (
                        <>
                            <Link className="border-0 rounded-2 mx-2" to='profile'><CgProfile className="fs-1 rounded-2" /></Link>
                            <button className="btn btn-danger" onClick={hadelLogout}>
                                Logout
                            </button>
                        </>

                    ) : (
                        <Nav.Link className="text-white" href="/register">
                            Register/Login
                        </Nav.Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
