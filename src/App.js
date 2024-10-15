import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import PredictForm from "./Components/PredictForm/PredictForm";
import ConsumedArea from "./Components/Consumed/ConsumedArea";
import PurchaseArea from "./Components/Purchase/PurchaseArea";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/consumed" element={<ConsumedArea/>}/>
                    <Route path="/" element={<PredictForm/>}/>
                    <Route path='/purchase' element={<PurchaseArea/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;