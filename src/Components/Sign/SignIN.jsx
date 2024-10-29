import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './signin.css';

const SignIn = ({setIsAuthenticated}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        if (username === 'guest' && password === 'guest') {
            const currentTime = new Date().getTime();
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('authTimestamp', currentTime);
            setIsAuthenticated(true);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="sign-in-container">
            <div>
                <h2>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;