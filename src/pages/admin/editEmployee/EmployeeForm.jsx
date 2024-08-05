import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ employee, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        Nombre: '',
        Apellido: '',
        Puesto: '',
        FechaContratacion: ''
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                Nombre: employee.Nombre,
                Apellido: employee.Apellido,
                Puesto: employee.Puesto || '',
                FechaContratacion: employee.FechaContratacion || ''
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="employee-form">
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    name="Nombre"
                    value={formData.Nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Apellido</label>
                <input
                    type="text"
                    name="Apellido"
                    value={formData.Apellido}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Puesto</label>
                <input
                    type="text"
                    name="Puesto"
                    value={formData.Puesto}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Fecha de Contratación</label>
                <input
                    type="date"
                    name="FechaContratacion"
                    value={formData.FechaContratacion}
                    onChange={handleChange}
                />
            </div>
            <div className="form-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default EmployeeForm;
