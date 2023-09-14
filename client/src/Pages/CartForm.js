import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function OrderForm({ onSubmit }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [successful, setSuccessful] = useState('');

  const navigate = useNavigate()

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

  const [enteredCustomerId, setEnteredCustomerId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { shipAddress, shipCity, shipRegion, shipPostalCode, shipCountry } = shippingInfo;

    if (!shipAddress || !shipCity || !shipRegion || !shipPostalCode || !shipCountry || !enteredCustomerId) {
      alert("Please fill in all fields.");
      return;
    }
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
        navigate('/payment')
        
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Products</h2>
      <ul style={{ listStyle: 'none', padding: 0, width: '40%', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {Array.isArray(cartItems) && cartItems.map((item, index) => (
          <li key={index} style={{ width: '100%', backgroundColor: 'orange', padding: '5px', margin: '5px 0', borderRadius: '5px', textAlign: 'center' }}>{item.product}</li>
        ))}
      </ul>


      <h3 style={{ textAlign: 'center' }}>Total Price: ${totalPrice}</h3>
      <h2 style={{ textAlign: 'center' }}>Enter Shipping Information</h2>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'lightgreen', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 auto', width: '35%' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>Customer ID:
          <input
            type="text"
            placeholder="Enter your customer ID"
            value={enteredCustomerId}
            onChange={(e) => setEnteredCustomerId(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </label>
        <label>Address:
          <textarea
            name="shipAddress"
            value={shippingInfo.shipAddress}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </label>
        <label>City:
          <input
            type="text"
            name="shipCity"
            value={shippingInfo.shipCity}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </label>
        <label>Region:
          <textarea
            name="shipRegion"
            value={shippingInfo.shipRegion}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </label>
        <label>Postal Code:
          <input
            type="text"
            name="shipPostalCode"
            value={shippingInfo.shipPostalCode}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </label>
        <label>Country:
          <input
            type="text"
            name="shipCountry"
            value={shippingInfo.shipCountry}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </label>
        <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'block', margin: '0 auto' }}>PAYMENT</button>
        <h1 style={{ color: 'green' }}>{successful}</h1>
      </form>
    </div>
  );
}

export default OrderForm;
