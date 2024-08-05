import React, { useState, useEffect } from 'react';
import './ProductForm.css'; // Importa el archivo CSS

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        img1: '',
        img2: '',
        img3: '',
        stockMax: '',
        stockMin: '',
        stock: '',
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="productForm">
            <div>
                <label>Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Precio</label>
                <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Imagen 1</label>
                <input
                    type="text"
                    name="img1"
                    value={formData.img1}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Imagen 2</label>
                <input
                    type="text"
                    name="img2"
                    value={formData.img2}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Imagen 3</label>
                <input
                    type="text"
                    name="img3"
                    value={formData.img3}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Stock Máximo</label>
                <input
                    type="number"
                    name="stockMax"
                    value={formData.stockMax}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Stock Mínimo</label>
                <input
                    type="number"
                    name="stockMin"
                    value={formData.stockMin}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                />
            </div>
            <div className="formActions">
                <button type="submit" className="saveButton">Guardar</button>
                <button type="button" className="cancelButton" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    );
};

export default ProductForm;
