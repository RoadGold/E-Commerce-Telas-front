import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product'; // Asegúrate de que la ruta sea correcta
import ProductForm from './ProductForm'; // Componente para manejar el formulario de productos

const URI = 'http://localhost:3001/products/'; // Aquí se hacen las peticiones

export const EditProduct = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await axios.get(URI);
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSaveProduct = async (product) => {
        if (product.id) {
            // Update product
            try {
                const res = await axios.put(`${URI}${product.id}`, product);
                setProducts(products.map(p => (p.id === product.id ? res.data : p)));
                setIsEditing(false);
                setCurrentProduct(null);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            // Create new product
            try {
                const res = await axios.post(URI, product);
                setProducts([...products, res.data.product]);
            } catch (error) {
                console.error('Error creating product:', error);
            }
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`${URI}${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setCurrentProduct(null);
    };

    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>Edit Products</h1>
            </div>
            <div className="productForm">
                {isEditing ? (
                    <ProductForm
                        product={currentProduct}
                        onSave={handleSaveProduct}
                        onCancel={handleCancelEdit}
                    />
                ) : (
                    <button onClick={() => setIsEditing(true)}>Add New Product</button>
                )}
            </div>
            <div className="products">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        data={product}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                    />
                ))}
            </div>
        </div>
    );
};

export default EditProduct;
