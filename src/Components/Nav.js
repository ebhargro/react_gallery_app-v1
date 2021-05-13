import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul className="main-nav">
            <li> <NavLink to="/oceans"> Oceans</NavLink></li>
            <li> <NavLink to="/sunrises"> Sunrises</NavLink></li>
            <li> <NavLink to="/wolves"> Wolves </NavLink></li>
        </ul>
    </nav>
);

export default Nav;