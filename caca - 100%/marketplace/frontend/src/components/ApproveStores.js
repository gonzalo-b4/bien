import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApproveStores = ({ token }) => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/stores/pending', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setStores(res.data);
            } catch (err) {
                console.error('Error:', err);
                if (err.response) {
                    console.error('Error Response Data:', err.response.data);
                    setError(err.response.data.msg);
                }
            }
        };

        fetchStores();
    }, [token]);

    const approveStore = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/stores/approve/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response:', res);
            console.log('Response Data:', res.data);
            setStores(stores.filter(store => store.id !== id));
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
                setError(err.response.data.msg);
            }
        }
    };

    const deleteStore = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/stores/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Response:', res);
            console.log('Response Data:', res.data);
            setStores(stores.filter(store => store.id !== id));
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                console.error('Error Response Data:', err.response.data);
                setError(err.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1>Pending Stores</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {stores.map(store => (
                    <li key={store.id}>
                        {store.name} - {store.description}
                        <button onClick={() => approveStore(store.id)}>Approve</button>
                        <button onClick={() => deleteStore(store.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApproveStores;