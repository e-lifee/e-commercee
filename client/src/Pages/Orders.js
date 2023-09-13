import React, { useState, useEffect } from 'react';

function Orders() {
  const [customerID, setCustomerID] = useState('');
  const [customerOrders, setCustomerOrders] = useState([]);

  const getOrders = async () => {
    const response = await fetch(`http://localhost:5000/customers/${customerID}/orders`);
    const jsonData = await response.json();
    setCustomerOrders(jsonData.orders)
  }

  useEffect(() => {
    if (customerID !== '') {
      getOrders();
    }
  }, [customerID]);

  useEffect(() => {
    console.log("customerOrders:", customerOrders);
  }, [customerOrders]);


  return (
    <div>
      <h1>orders</h1>
      <input
        type="text"
        placeholder="Customer ID"
        value={customerID}
        onChange={(e) => setCustomerID(e.target.value)}
      />

      <ul>
        {Array.isArray(customerOrders) && customerOrders.map((order) => (
          <li style={{ backgroundColor: 'orange' }} key={order.order_id}>{order.product_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
