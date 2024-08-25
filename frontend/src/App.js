import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Register from './Register';  // Import the Register component
import'./App.css';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [showRegister, setShowRegister] = useState(false);  // State to toggle between login and register

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const { token } = response.data;
            const decoded = jwtDecode(token);

            setUserEmail(decoded.email);
            setIsLoggedIn(true);
            setMessage(`Hello, ${decoded.email}`);

           
            

            localStorage.setItem('token', token);
        } catch (error) {
            setMessage('Login failed: Invalid email or password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserEmail('');
        setMessage('Logged out');
        localStorage.removeItem('token');
    };

    return (
      
         <div className="App">
        
            {!isLoggedIn ? (
                showRegister ? (
                    <Register />
                ) : (
                     <form className="login-form" onSubmit={handleLogin}>
                     <div className="form-container">
                    
                        <h2>Login</h2>
                        <div className='form-wrapper'>
                        
                          <label type="text" placeholder='Email'value ='email'></label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className='mb-3'>
                          <label htmlFor="password"></label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>
                        <button type="submit">Login</button>
                        <p>{message}</p>
                        <p>
                            Don't have an account?{' '}
                            <button type="button" onClick={() => setShowRegister(true)}>Register</button>
                        </p>

</div>
                       
                    </form>
                    
                )
            ) : (
                <div>
                    <h2>{message}</h2>
                    <button onClick={handleLogout} >Logout</button>
                </div>
            )}
        </div>
        
        

    );
}

export default App;
