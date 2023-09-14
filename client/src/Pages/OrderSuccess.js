import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function OrderSuccess() {
    const [cartItems, setCartItems] = useState([]);
    const [orderInfos, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate=useNavigate()

    const handleButton=()=>{
        cartItems.forEach(async (cartItem) => {
            try {
              const deleteProduct = await fetch(`http://localhost:5000/cart/${cartItem.cart_id}`, {
                method: "DELETE"
              });
            } catch (error) {
              console.log(error.message);
            }
          })
          setCartItems([]);
        navigate('/home')
    }
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

    const getOrder = async () => {
        try {
            const response = await fetch('http://localhost:5000/orders')
            const jsonData = await response.json()
            setOrders(jsonData)
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
        getOrder()
    }, []);
    return (
        <div>
            <h2>Order Placed Successfully...</h2>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>Order Details</h2>
                <ul style={{ listStyle: 'none', padding: 0, width: '40%', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {Array.isArray(cartItems) && cartItems.map((item, index) => (
                        <li key={index} style={{ width: '100%', backgroundColor: 'orange', padding: '5px', margin: '5px 0', borderRadius: '5px', textAlign: 'center' }}>{item.product}</li>
                    ))}
                </ul>
                <h2>Total Price: ${totalPrice}</h2>
            </div>
            <div style={{backgroundColor:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
                {orderInfos.map((order) => (
                    <div className="card" style={{ width: '25%', margin: "15px" }} key={order.order_id}>
                        <h5>Customer ID: {order.customer_id}</h5>
                        <h5>ORDER DATE: {order.order_date}</h5>
                        <h5>ADDRESS: {order.ship_address}</h5>
                        <h5>CITY: {order.ship_city}</h5>
                        <h5>REGION: {order.ship_region}</h5>
                        <h5>POSTAL CODE: {order.ship_postal_code}</h5>
                        <h5>COUNTRY: {order.ship_country}</h5>
                    </div>
                ))}
            </div>

            <button onClick={handleButton}>HOME PAGE</button>
        </div>
    )
}

export default OrderSuccess
