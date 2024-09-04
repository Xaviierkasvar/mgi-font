import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Crud from './components/Crud';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setToken={setToken} />} />
                <Route path="/crud" element={token ? <Crud /> : <Login setToken={setToken} />} />
            </Routes>
        </Router>
    );
};

export default App;
