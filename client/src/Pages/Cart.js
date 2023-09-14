import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart');
      const jsonData = await response.json();
      setCartItems(jsonData);
      calculateTotalPrice(jsonData); 
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteProduct = async (cart_id) => {
    try {
      const deleteProduct = await fetch(`http://localhost:5000/cart/${cart_id}`, {
        method: "DELETE"
      });

      setCartItems(cartItems.filter(cart => cart.cart_id !== cart_id));
      calculateTotalPrice(cartItems.filter(cart => cart.cart_id !== cart_id)); 
      console.log(deleteProduct);
    } catch (error) {
      console.error(error.message);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    let total = 0;

    cartItems.forEach(item => {
      total += item.price;
    });

    setTotalPrice(total);
  };

  useEffect(() => {
    getCart();
  }, []);

  const navigate=useNavigate()
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.cart_id}>
              <td>{item.product}</td>
              <td>{item.price}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteProduct(item.cart_id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <table className="table">
          <tbody>
            <tr>
              <td>Total Price:</td>
              <td>${totalPrice.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div>
          <button
            className='btn btn-warning'
            onClick={() => navigate('/form')}
            disabled={cartItems.length === 0}
          >Confirm Cart</button>
        </div>
      </div>
      

    </div>
  );
}

export default Cart;
