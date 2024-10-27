import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import PredictForm from "./Components/PredictForm/PredictForm";
import ConsumedArea from "./Components/Consumed/ConsumedArea";
import PurchaseArea from "./Components/Purchase/PurchaseArea";
import Main from "./Components/Main/Main";

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/consumed" element={<ConsumedArea/>}/>
                    <Route path="/predict" element={<PredictForm/>}/>
                    <Route path='/purchase' element={<PurchaseArea/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;