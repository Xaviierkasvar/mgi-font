import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            if (response.status === 200) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/crud'); // Navigate to CRUD view on successful login
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid credentials'); // Customize the error message as needed
            } else {
                setError('An error occurred. Please try again.'); // General error message
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <div className="text-center mb-4">
                <h1 className="display-4">MSI</h1>
                <p className="lead">Prueba Técnica: Desarrollo de un Módulo de Gestión de Inventarios</p>
            </div>
            <div className="card shadow-lg p-4 mb-5" style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
