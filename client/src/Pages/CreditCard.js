import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
const CreditCards = () => {
    const [data, setData] = useState({
        cvc: "",
        expiry: "",
        name: "",
        number: ""
    });
    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const handleSubmit = () => {
        navigate('/ordersuccess')
    }
    return (
        <div id="PaymentForm">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>Products</h2>
                <ul style={{ listStyle: 'none', padding: 0, width: '40%', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {Array.isArray(cartItems) && cartItems.map((item, index) => (
                        <li key={index} style={{ width: '100%', backgroundColor: 'orange', padding: '5px', margin: '5px 0', borderRadius: '5px', textAlign: 'center' }}>{item.product}</li>
                    ))}
                </ul>
                <h2>Total Price: ${totalPrice}</h2>
            </div>
            <Cards
                cvc={data.cvc}
                expiry={data.expiry}
                focus={data.focus}
                name={data.name}
                number={data.number}
            />
            <form action="" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
                <input
                    type="number"
                    name="cvc"
                    placeholder="CVC"
                    onChange={handleInputChange}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '20%',
                        fontSize: '16px',
                    }}
                />

                <input
                    type="date"
                    name="expiry"
                    placeholder="Expire Date"
                    onChange={handleInputChange}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '20%',
                        fontSize: '16px',
                    }}
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleInputChange}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '20%',
                        fontSize: '16px',
                    }}
                />

                <input
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    onChange={handleInputChange}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        width: '20%',
                        fontSize: '16px',
                    }}
                />

                <button type="submit" style={{ backgroundColor: '#1e90ff', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', display: 'block', margin: '0 auto' }}>COMPLETE</button>

            </form>
        </div>
    );
};
export default CreditCards;