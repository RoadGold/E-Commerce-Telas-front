import React, { useState, useEffect } from "react";
import axios from "axios";

const EditMachinery = () => {
    const [machinery, setMachinery] = useState([]);
    const [newMachinery, setNewMachinery] = useState({
        Nombre: "",
        Descripcion: "",
        FechaAdquisicion: "",
        Estado: ""
    });

    useEffect(() => {
        const fetchMachinery = async () => {
            try {
                const response = await axios.get("http://localhost:3001/machinery");
                if (Array.isArray(response.data)) {
                    setMachinery(response.data);
                } else {
                    setMachinery([]);
                }
            } catch (error) {
                console.error("Error fetching machinery:", error);
                setMachinery([]);
            }
        };
        fetchMachinery();
    }, []);

    const handleInputChange = (e) => {
        setNewMachinery({
            ...newMachinery,
            [e.target.name]: e.target.value
        });
    };

    const handleCreateMachinery = async () => {
        try {
            await axios.post("http://localhost:3001/machinery", newMachinery);
            setNewMachinery({
                Nombre: "",
                Descripcion: "",
                FechaAdquisicion: "",
                Estado: ""
            });
            const response = await axios.get("http://localhost:3001/machinery");
            if (Array.isArray(response.data)) {
                setMachinery(response.data);
            }
        } catch (error) {
            console.error("Error creating machinery:", error);
        }
    };

    const handleDeleteMachinery = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/machinery/${id}`);
            const response = await axios.get("http://localhost:3001/machinery");
            if (Array.isArray(response.data)) {
                setMachinery(response.data);
            }
        } catch (error) {
            console.error("Error deleting machinery:", error);
        }
    };

    const handleUpdateMachinery = async (id) => {
        try {
            await axios.put(`http://localhost:3001/machinery/${id}`, newMachinery);
            const response = await axios.get("http://localhost:3001/machinery");
            if (Array.isArray(response.data)) {
                setMachinery(response.data);
            }
        } catch (error) {
            console.error("Error updating machinery:", error);
        }
    };

    return (
        <div>
            <h1>Edit Machinery</h1>
            <input
                type="text"
                name="Nombre"
                value={newMachinery.Nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
            />
            <input
                type="text"
                name="Descripcion"
                value={newMachinery.Descripcion}
                onChange={handleInputChange}
                placeholder="Descripción"
            />
            <input
                type="date"
                name="FechaAdquisicion"
                value={newMachinery.FechaAdquisicion}
                onChange={handleInputChange}
                placeholder="Fecha de Adquisición"
            />
            <input
                type="text"
                name="Estado"
                value={newMachinery.Estado}
                onChange={handleInputChange}
                placeholder="Estado"
            />
            <button onClick={handleCreateMachinery}>Añadir maquinaria</button>
            {machinery.map(machine => (
                <div key={machine.MaquinariaID}>
                    {machine.Nombre} - {machine.Descripcion} ({machine.Estado})
                    <button onClick={() => handleUpdateMachinery(machine.MaquinariaID)}>Update</button>
                    <button onClick={() => handleDeleteMachinery(machine.MaquinariaID)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default EditMachinery;
