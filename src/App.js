import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import PredictForm from "./Components/PredictForm/PredictForm";
import ConsumedArea from "./Components/Consumed/ConsumedArea";
import PurchaseArea from "./Components/Purchase/PurchaseArea";
import Main from "./Components/Main/Main";
import SignIn from "./Components/Sign/SignIN";
import AuthWrapper from "./Components/AuthWrapper/AuthWrapper";

import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        const authTimestamp = localStorage.getItem('authTimestamp');
        const currentTime = new Date().getTime();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (authStatus === 'true' && currentTime - authTimestamp < twentyFourHours) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('authTimestamp');
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('authTimestamp');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
                <Routes>
                    <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated}/>}/>
                    <Route path="*" element={
                        <AuthWrapper isAuthenticated={isAuthenticated}>
                            <Routes>
                                <Route path="/" element={<Main/>}/>
                                <Route path="/consumed" element={<ConsumedArea/>}/>
                                <Route path="/predict" element={<PredictForm/>}/>
                                <Route path='/purchase' element={<PurchaseArea/>}/>
                            </Routes>
                        </AuthWrapper>
                    }/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;