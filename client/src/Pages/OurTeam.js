import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
function OurTeam() {
    const [employees, setEmployees] = useState([]);

    const getEmployees = async () => {
        try {
            const response = await fetch('http://localhost:5000/employees');
            const jsonData = await response.json();
            setEmployees(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getEmployees();
    }, []);

    const cardContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0px 0px',
        backgroundColor: "#228b22",
        width: "100%",
        padding: "5px",
        // alignItems:"center"
    };
    return (
        <div>
            <div style={cardContainerStyle}>
                {employees.map((employee) => (
                    <div className="card" style={{ width: '18%', margin: "15px" }} key={employee.employee_id}>
                        <img className="card-img-top" src={employee.photo_path} alt="Card image cap" style={{ height: "40%" }} />
                        <div className="card-body">
                            <strong style={{ color: 'black' }}>{employee.first_name} {employee.last_name}</strong>
                            <h5>{employee.title}</h5>
                            <p className="card-text">{employee.notes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurTeam;
