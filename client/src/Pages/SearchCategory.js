import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {AiOutlineHeart} from 'react-icons/ai'

function SearchCategory() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const [addedProducts, setAddedProducts] = useState([]);
  const [favorites, setFavorites] = useState([])
  const getProductsByCategory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search/${category}`)
      const jsonData = await response.json()
      console.log(jsonData)
      setProducts(jsonData)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getProductsByCategory();
  }, [category]);
  
  const addToCart = async (product) => {
    try {
      const body = { product_id: product.product_id };
      const response = await fetch('http://localhost:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      console.log(response);
      setAddedProducts([...addedProducts, product.product_id]);

    } catch (error) {
      console.error(error.message);
    }
  };

  const addToFavs = async (product) => {
    try {
      const body = { product_id: product.product_id };
      const response = await fetch('http://localhost:5000/favorites/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      console.log(response);
      setFavorites([...favorites, product.product_id]);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>

      <h1>Products in Category: {category}</h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Add To Cart</th>
            <th>Add To Favorites</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_name}</td>
              <td>{product.quantity_per_unit}</td>
              <td>{product.unit_price}</td>
              <td>
                <button
                  onClick={() => addToCart(product)}
                  className={`btn ${addedProducts.includes(product.product_id) ? 'btn-success' : 'btn-primary'}`}
                >
                  {addedProducts.includes(product.product_id) ? 'Added' : 'Add to Cart'}
                </button>
              </td>
              <td>
                <button
                  onClick={() => addToFavs(product)}
                  className={`btn ${favorites.includes(product.product_id) ? 'btn-success' : 'btn-light'}`}
                >
                  <AiOutlineHeart />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchCategory;
