import React from 'react';

export const Product = ({ data, onEdit, onDelete }) => {
    const { nombre, precio, descripcion, stockMax, stockMin, stock, img1, img2, img3 } = data; //se le da valor a las variables en funcion de lo que se saca de la base de datos

    return (
        <div className="product"> {/*aqui se muestran las informaciones de los productos en la pagina principal */}
            <h2>{nombre}</h2>
            <div className="slide-var">
                <ul>
                    <li><img src={img1} alt={nombre}/></li>{/*este es el carrusel para las imagenes */}
                    <li><img src={img2} alt={nombre}/></li>
                    <li><img src={img3} alt={nombre}/></li>
                </ul>
            </div>
            <div className="descripcion">
                <p>{descripcion}</p>
            </div>
            <div className="description">
                <p>Precio: ${precio}</p>
                <p>Stock Max.: {stockMax}</p>
                <p>Stock Min.: {stockMin}</p>
                <p>Stock: {stock}</p>
            </div>
            <div className="actions">
                <button onClick={() => onEdit(data)}>Editar</button>
                <button onClick={() => onDelete(data.id)}>Eliminar</button>
            </div>
        </div>
    );
};

export default Product;
