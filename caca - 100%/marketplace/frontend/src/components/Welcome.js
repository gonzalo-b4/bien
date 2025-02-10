import React from 'react';

const Welcome = ({ role, storeName }) => {
    return (
        <div>
            <h1>Bienvenido, {role === 'admin' ? 'Administrador' : role === 'owner' ? 'Propietario' : 'Usuario'}</h1>
            {role === 'owner' && storeName && <h2>Tu tienda: {storeName}</h2>}
        </div>
    );
};

export default Welcome;
