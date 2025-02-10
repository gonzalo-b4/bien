import React, { useState } from 'react';
import axios from 'axios';
import './User.css';

const Register = ({ handleCloseClick }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'owner'
    });
    const [error, setError] = useState('');

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            console.log('Response:', res);
            console.log('Response Data:', res.data);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
                setError(err.response.data.msg);
            }
        }
    };

    return (
        <div className="form-container user-container">
            <i className="fi fi-sr-cross-circle close-button" onClick={handleCloseClick}></i>
            <form onSubmit={onSubmit}>
                <h1>Create Account</h1>
                <div className="social-container register-social-container">
                    <button className="social"><i className="fab fa-facebook-f"></i></button>
                    <button className="social"><i className="fab fa-google-plus-g"></i></button>
                    <button className="social"><i className="fab fa-linkedin-in"></i></button>
                </div>
                <span>or use your email for registration</span>
                <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} required />
                <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} required />
                <input type="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                <select name="role" value={role} onChange={onChange}>
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Sign Up</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Register;