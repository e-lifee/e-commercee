import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai'
import { TbLogout } from 'react-icons/tb'
function NavScrollExample() {
  const [categoryName, setCategoryName] = useState('')
  const [cartItems, setCartItems] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [favItems, setFavItems] = useState([]);
  const [count, setCount] = useState(0);

  const getFavs = async () => {
    try {
      const response = await fetch('http://localhost:5000/favs');
      const jsonData = await response.json();
      setFavItems(jsonData);
      favCount(favItems)
    } catch (error) {
      console.error(error.message);
    }
  };
  const favCount = (favItemss) => {
    let count = 0;
    favItems.forEach(item => {
      count = count + 1
    })
    setCount(count)
  }
  const getCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart');
      const jsonData = await response.json();
      setCartItems(jsonData);
      productCountt(cartItems);
    } catch (error) {
      console.error(error.message);
    }
  };
  const productCountt = (cartItems) => {
    let count = 0;

    cartItems.forEach(item => {
      count = count + 1;
    });

    setProductCount(count);
  };

  useEffect(() => {
    getCart()
  })
  
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate(`/search?category=${categoryName}`)
  }

  const location = useLocation();

  if (location.pathname === '/login') {
    return null;
  }
  return (
    <Navbar expand="lg" bg="orange" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/" className="me-auto">ORDER ONLINE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end" variant='light'>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/favs"><AiFillHeart />Favorites</Nav.Link>
            <Nav.Link as={Link} to="/cart"><AiOutlineShoppingCart />Cart({productCount})</Nav.Link>
            <NavDropdown title="My Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/customerOrder">
                Customer Order
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/team">
                Our Team
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/login">
              <TbLogout/>LogOut
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSubmit}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;


