import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Employee from './Employee'; // Asegúrate de que la ruta sea correcta
import EmployeeForm from './EmployeeForm'; // Componente para manejar el formulario de empleados

const URI = 'http://localhost:3001/employees/';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(URI);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSaveEmployee = async (employee) => {
        try {
            if (isEditing) {
                await axios.put(`${URI}${currentEmployee.EmpleadoID}`, employee);
                setEmployees(employees.map(emp => (emp.EmpleadoID === currentEmployee.EmpleadoID ? employee : emp)));
            } else {
                const response = await axios.post(URI, employee);
                setEmployees([...employees, response.data]);
            }
            setIsEditing(false);
            setCurrentEmployee(null);
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`${URI}${id}`);
            setEmployees(employees.filter(emp => emp.EmpleadoID !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEditEmployee = (employee) => {
        setIsEditing(true);
        setCurrentEmployee(employee);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentEmployee(null);
    };

    return (
        <div className="employees">
            <h1>Employee Management</h1>
            {isEditing ? (
                <EmployeeForm
                    employee={currentEmployee}
                    onSave={handleSaveEmployee}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <button onClick={() => setIsEditing(true)}>Add Employee</button>
            )}
            <div className="employee-list">
                {employees.map(employee => (
                    <Employee
                        key={employee.EmpleadoID}
                        employee={employee}
                        onEdit={handleEditEmployee}
                        onDelete={handleDeleteEmployee}
                    />
                ))}
            </div>
        </div>
    );
};

export default Employees;
