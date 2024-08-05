// components/CotizacionesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CotizacionesList = () => {
    const [cotizaciones, setCotizaciones] = useState([]);

    useEffect(() => {
        axios.get('/cotizaciones')
            .then(response => {
                setCotizaciones(response.data);
            })
            .catch(error => {
                console.error('Error fetching cotizaciones:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Cotizaciones</h1>
            <ul>
                {cotizaciones.map(cotizacion => (
                    <li key={cotizacion.CotizacionID}>
                        {cotizacion.ClienteNombre} - {cotizacion.FechaCotizacion} - {cotizacion.Total}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CotizacionesList;
