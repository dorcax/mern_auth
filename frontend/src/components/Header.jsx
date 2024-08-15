
import { Navbar, Nav, Container, NavDropdown, Badge, Toast } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { logout } from "../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import{toast } from "react-toastify"
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const[logoutApicall] =useLogoutMutation()
  const dispatch =useDispatch()
  const navigate =useNavigate() 

 const logoutHandler=async()=>{
try {
  await logoutApicall().unwrap()
  dispatch(logout())
  navigate("/login")
} catch (error) {
  toast.error(error)
  
}
console.log("its working")

 }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.user.name}>
                  {/* Wrapping in React.Fragment */}
                  <>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </>
                </NavDropdown>
              ) : (
                <>
                 <Nav.Link href="/register">
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                  <Nav.Link to="/login">
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                 
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
