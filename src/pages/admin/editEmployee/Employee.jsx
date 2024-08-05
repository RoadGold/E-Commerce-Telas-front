import React from 'react';

const Employee = ({ employee, onEdit, onDelete }) => {
    const { EmpleadoID, Nombre, Apellido, Puesto, FechaContratacion } = employee;

    return (
        <div className="employee">
            <h2>{Nombre} {Apellido}</h2>
            <p>Puesto: {Puesto}</p>
            <p>Fecha de Contratación: {FechaContratacion}</p>
            <div className="actions">
                <button onClick={() => onEdit(employee)}>Edit</button>
                <button onClick={() => onDelete(EmpleadoID)}>Delete</button>
            </div>
        </div>
    );
};

export default Employee;
