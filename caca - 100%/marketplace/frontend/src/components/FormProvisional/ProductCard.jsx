import React from 'react';
import './ProductCard.css';  // Importa un archivo CSS para estilos adicionales.

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Descripción de la imagen: {product.imageDescription}</p>
        </div>
    );
};

export default ProductCard;