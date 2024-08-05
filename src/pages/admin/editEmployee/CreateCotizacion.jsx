// components/CreateCotizacion.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCotizacion = () => {
    const [cotizacion, setCotizacion] = useState({
        ClienteNombre: '',
        FechaCotizacion: '',
        detalles: []
    });

    const handleChange = (e) => {
        setCotizacion({
            ...cotizacion,
            [e.target.name]: e.target.value
        });
    };

    const handleDetalleChange = (index, e) => {
        const newDetalles = cotizacion.detalles.map((detalle, i) => {
            if (i === index) {
                return { ...detalle, [e.target.name]: e.target.value };
            }
            return detalle;
        });
        setCotizacion({
            ...cotizacion,
            detalles: newDetalles
        });
    };

    const addDetalle = () => {
        setCotizacion({
            ...cotizacion,
            detalles: [...cotizacion.detalles, { id: '', Cantidad: 1, PrecioUnitario: 0 }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/cotizaciones', cotizacion)
            .then(response => {
                console.log('Cotización creada:', response.data);
                setCotizacion({
                    ClienteNombre: '',
                    FechaCotizacion: '',
                    detalles: []
                });
            })
            .catch(error => {
                console.error('Error creating cotizacion:', error);
            });
    };

    return (
        <div>
            <h1>Crear Cotización</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Cliente Nombre</label>
                    <input
                        type="text"
                        name="ClienteNombre"
                        value={cotizacion.ClienteNombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Fecha Cotización</label>
                    <input
                        type="date"
                        name="FechaCotizacion"
                        value={cotizacion.FechaCotizacion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <h2>Detalles</h2>
                {cotizacion.detalles.map((detalle, index) => (
                    <div key={index}>
                        <label>Producto ID</label>
                        <input
                            type="text"
                            name="id"
                            value={detalle.id}
                            onChange={(e) => handleDetalleChange(index, e)}
                            required
                        />
                        <label>Cantidad</label>
                        <input
                            type="number"
                            name="Cantidad"
                            value={detalle.Cantidad}
                            onChange={(e) => handleDetalleChange(index, e)}
                            required
                        />
                        <label>Precio Unitario</label>
                        <input
                            type="number"
                            name="PrecioUnitario"
                            value={detalle.PrecioUnitario}
                            onChange={(e) => handleDetalleChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addDetalle}>Agregar Detalle</button>
                <button type="submit">Crear Cotización</button>
            </form>
        </div>
    );
};

export default CreateCotizacion;
