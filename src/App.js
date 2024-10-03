import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GraphArea from './Components/GraphArea/GraphArea';
import NavBar from './Components/NavBar/NavBar';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/consumed" element={<GraphArea type="(Actual)" path="consumed"/>}/>
                    <Route path="/predict" element={<GraphArea type="(Pred)" path="predicted"/>}/>
                    <Route path="/" element={<GraphArea type="demand"/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;