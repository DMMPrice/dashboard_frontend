import React from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Power Vision Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <li className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Upload
                            </li>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="/">Renewable Energy</a></li>
                                <li><a className="dropdown-item" href="/">Inter State Non-Renewable Energy</a></li>
                                <li><a className="dropdown-item" href="/">Intra State Non-Renewable Energy</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/consumed">Consumed</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/predict">Predicted</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;