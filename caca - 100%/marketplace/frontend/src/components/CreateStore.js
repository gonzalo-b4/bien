import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateStore = ({ token }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [hasStore, setHasStore] = useState(false);
    const [error, setError] = useState('');

    const { name, description } = formData;

    useEffect(() => {
        const checkHasStore = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/stores/hasStore', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setHasStore(res.data.hasStore);
            } catch (err) {
                console.error('Error:', err);
                if (err.response) {
                    console.error('Error Response Data:', err.response.data);
                }
            }
        };

        checkHasStore();
    }, [token]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/stores', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
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

    if (hasStore) {
        return <p>Ya tienes una tienda registrada.</p>;
    }

    return (
        <div className="form-container">
            <form onSubmit={onSubmit}>
                <h1>Create Store</h1>
                <input type="text" name="name" placeholder="Store Name" value={name} onChange={onChange} required />
                <input type="text" name="description" placeholder="Description" value={description} onChange={onChange} required />
                <button type="submit">Create Store</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default CreateStore;