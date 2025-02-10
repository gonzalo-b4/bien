import React, { useState } from 'react';
import axios from 'axios';
import './User.css';

const Login = ({ setToken, setRole, handleSignUpClick, handleCloseClick }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            console.log('Response:', res);
            console.log('Response Data:', res.data);
            setToken(res.data.token);
            const decodedToken = JSON.parse(atob(res.data.token.split('.')[1]));
            setRole(decodedToken.user.role);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
                setError(err.response.data.msg);
            }
        }
    };

    return (
        <div className="form-container sign-in-container user-container">
            <i className="fi fi-sr-cross-circle close-button" onClick={handleCloseClick}></i>
            <form onSubmit={onSubmit}>
                <h1>Iniciar sesión</h1>
                <div className="social-container">
                    <button type="button" className="social"><i className="fab fa-facebook-f"></i></button>
                    <button type="button" className="social"><i className="fab fa-google-plus-g"></i></button>
                    <button type="button" className="social"><i className="fab fa-linkedin-in"></i></button>
                </div>
                <span>Inicia sesión con</span>
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <button type="button" className="link-button">Olvide mi contraseña?</button>
                <button type="button" className="toggle-link" onClick={handleSignUpClick}>Registrarse</button>
                <button type="submit">Iniciar sesión</button>
                <button className="ghost mobile-only" onClick={handleSignUpClick}>Registrarse</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;