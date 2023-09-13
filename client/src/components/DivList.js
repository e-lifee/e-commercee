import React, { useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts';

function DivList() {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const getCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/categories');
            const jsonData = await response.json();
            setCategories(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const cardContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: '0px 0px',
        backgroundColor: "#228b22",
        width: "100%",
        padding: "5px"
    };
    return (
        <div>
            <div style={cardContainerStyle}>
                {categories.map((category) => (
                    <div className="card" style={{ width: '10%', margin: "10px" }} key={category.category_id} onClick={() => setSelectedCategoryId(category.category_id)}>
                        <img className="card-img-top" src={category.picture} alt="Card image cap" style={{ height: "40%" }} />
                        <div className="card-body">
                            <strong style={{ color: 'black' }}>{category.category_name}</strong>
                            <p className="card-text">{category.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategoryId !== null && (
                <CategoryProducts categoryId={selectedCategoryId} />
            )}
        </div>
    );
}

export default DivList;
