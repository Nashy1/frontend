import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate(); // Use for navigation after logout

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false);
    alert("You have successfully logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "Silver" }}>
          <FontAwesomeIcon icon={faVideoSlash} /> Silver
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink  className="nav-link" to="/watchList">
              Watch List
            </NavLink>
          </Nav>
          {isLoggedIn ? (
            <Button
              variant="outline-info"
              className="me-2"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <NavLink to="/login" className="btn btn-outline-info me-2">
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-outline-info">
                Register
              </NavLink>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { NavLink } from 'react-router-dom';

// const Header = ({ isLoggedIn, setIsLoggedIn }) => {
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Clear token
//     setIsLoggedIn(false);
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container fluid>
//         <Navbar.Brand href="/" style={{ color: 'gold' }}>
//           <FontAwesomeIcon icon={faVideoSlash} /> Gold
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
//             <NavLink className="nav-link" to="/">
//               Home
//             </NavLink>
//             <NavLink className="nav-link" to="/watchList">
//               Watch List
//             </NavLink>
//           </Nav>
//           {isLoggedIn ? (
//             <Button variant="outline-info" className="me-2" onClick={handleLogout}>
//               Logout
//             </Button>
//           ) : (
//             <>
//               <NavLink to="/login" className="btn btn-outline-info me-2">
//                 Login
//               </NavLink>
//               <NavLink to="/register" className="btn btn-outline-info">
//                 Register
//               </NavLink>
//             </>
//           )}
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;