import React, { useEffect, useState } from 'react'
function ListAdmins() {
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/suppliers")
      const jsonData = await response.json()
      setCategories(jsonData)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  console.log(categories)
  return (
    <div>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Suppliers</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.supplier_id}>
              <td>{category.company_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListAdmins
