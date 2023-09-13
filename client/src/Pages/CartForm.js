import React, { useState, useEffect } from 'react';

function OrderForm({ onSubmit }) {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [successfull,setSuccessfull]=useState('')
  const getCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/cart');
      const jsonData = await response.json();
      setCartItems(jsonData);
      calculateTotalPrice(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }
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

  const [shippingInfo, setShippingInfo] = useState({
    shipAddress: '',
    shipCity: '',
    shipRegion: '',
    shipPostalCode: '',
    shipCountry: '',
  });
  const [enteredCustomerId, setEnteredCustomerId] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shipAddress, shipCity, shipRegion, shipPostalCode, shipCountry } = shippingInfo;

    try {
      const response = await fetch('http://localhost:5000/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: enteredCustomerId,
          ship_address: shipAddress,
          ship_city: shipCity,
          ship_region: shipRegion,
          ship_postal_code: shipPostalCode,
          ship_country: shipCountry,
        }),
      });

      if (response.status === 201) {
        console.log("Order placed successfully");
        cartItems.forEach(async (cartItem) => {
          try {
            const deleteProduct = await fetch(`http://localhost:5000/cart/${cartItem.cart_id}`, {
              method: "DELETE"
            });
          } catch (error) {
            console.log(error.message);
          }
        })
        setCartItems([])
        setSuccessfull("ORDER ADDED SUCCESSFULLY!...")
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {Array.isArray(cartItems) && cartItems.map((item, index) => (
          <li style={{ backgroundColor: 'orange' }} key={index}>{item.product}</li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>
      <h2>Enter Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer ID:
          <input
            type="text"
            placeholder="Enter your customer ID"
            value={enteredCustomerId}
            onChange={(e) => setEnteredCustomerId(e.target.value)}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="shipAddress"
            value={shippingInfo.shipAddress}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="shipCity"
            value={shippingInfo.shipCity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Region:
          <input
            type="text"
            name="shipRegion"
            value={shippingInfo.shipRegion}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Postal Code:
          <input
            type="text"
            name="shipPostalCode"
            value={shippingInfo.shipPostalCode}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="shipCountry"
            value={shippingInfo.shipCountry}
            onChange={handleChange}
            required
          />
        </label>
        <button className='' type="submit">Place Order</button>
        <h1 style={{color:'green'}}>{successfull}</h1>
      </form>
    </div>
  );
}

export default OrderForm;
