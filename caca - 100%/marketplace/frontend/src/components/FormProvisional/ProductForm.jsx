import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductForm.css';  // Importa un archivo CSS para estilos adicionales.

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: ''
    });

    const [imageDescription, setImageDescription] = useState('');
    const [products, setProducts] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageDescriptionChange = (e) => {
        setImageDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('stock', product.stock);

        const fileInput = document.getElementById('imageUrlFrente');
        if (fileInput.files.length > 0) {
            formData.append('imageUrlFrente', fileInput.files[0]);
        }
        formData.append('imageDescription', imageDescription);

        try {
            const response = await fetch('http://localhost:3001/images/single', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log(result);
            const newProduct = { ...product, imageUrl: result.imageUrl, imageDescription: imageDescription };
            setProducts([...products, newProduct]);
            setProduct({ ...product, imageUrl: result.imageUrl });
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error subiendo el archivo:', error);
            // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error
        }

        setImageDescription('');
    };

    return (
        <div className="form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={product.name} 
                    onChange={handleChange} 
                    placeholder="Nombre" 
                    required 
                />
                <input 
                    type="text" 
                    name="description" 
                    value={product.description} 
                    onChange={handleChange} 
                    placeholder="Descripción" 
                />
                <input 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    onChange={handleChange} 
                    placeholder="Precio" 
                    required 
                />
                <input 
                    type="text" 
                    name="category" 
                    value={product.category} 
                    onChange={handleChange} 
                    placeholder="Categoría" 
                />
                <input 
                    type="number" 
                    name="stock" 
                    value={product.stock} 
                    onChange={handleChange} 
                    placeholder="Stock" 
                />
                <input 
                    type="text" 
                    name="imageUrl" 
                    value={product.imageUrl} 
                    onChange={handleChange} 
                    placeholder="Imagen URL" 
                />
                <input 
                    type="file" 
                    name="imageUrlFrente" 
                    id="imageUrlFrente" 
                    placeholder="Imagen Frente" 
                />
                <input 
                    type="text" 
                    name="imageDescription" 
                    value={imageDescription} 
                    onChange={handleImageDescriptionChange} 
                    placeholder="Descripción de la imagen" 
                />
                <button type="submit">Agregar Producto</button>
            </form>
            <div className="product-list">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductForm;