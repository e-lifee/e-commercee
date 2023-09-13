import React, { useEffect,useState } from 'react'

function Favorites() {
    const [favItems, setFavItems] = useState([]);

  const getFavs = async () => {
    try {
      const response = await fetch('http://localhost:5000/favs');
      const jsonData = await response.json();
      setFavItems(jsonData); 
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteProduct = async (fav_id) => {
    try {
      const deleteProduct = await fetch(`http://localhost:5000/favs/${fav_id}`, {
        method: "DELETE"
      });

      setFavItems(favItems.filter(fav => fav.fav_id !== fav_id));
      console.log(deleteProduct);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(()=>{
    getFavs()
  },[])
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
          {favItems.map((item) => (
            <tr key={item.fav_id}>
              <td>{item.product_name}</td>
              <td>{item.product_price}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteProduct(item.fav_id)}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Favorites
