import React from 'react';
import userContext from './UserContext';

function Navbar(){
    const { firstName, lastName } = React.useContext(userContext);
    return (
        <nav className="navbar">
            <h1>Login User {firstName}  {lastName}</h1>
        </nav>
    )
}
export default Navbar;