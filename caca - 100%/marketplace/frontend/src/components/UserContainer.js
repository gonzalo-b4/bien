import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './User.css';

const UserContainer = ({ isVisible, setIsVisible }) => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={`user-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
            <div className="container">
                <i className="fi fi-sr-cross-circle close-button" onClick={toggleVisibility}></i>
                <div className={`form-container sign-up-container ${isRightPanelActive ? 'active' : ''}`}>
                    <Register handleCloseClick={toggleVisibility} />
                </div>
                <div className={`form-container sign-in-container ${isRightPanelActive ? '' : 'active'}`}>
                    <Login handleSignUpClick={handleSignUpClick} handleCloseClick={toggleVisibility} />
                </div>
                <div className="overlay-container hide-on-mobile">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>¡Bienvenido de nuevo!</h1>
                            <p>Para mantenerse conectado con nosotros, inicie sesión con su información personal</p>
                            <button className="ghost" onClick={handleSignInClick}>Iniciar Sesión</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>¡Hola, Amigo!</h1>
                            <p>Ingrese sus datos personales y comience su viaje con nosotros</p>
                            <button className="ghost" onClick={handleSignUpClick}>Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserContainer;
