import react from 'react';
import userContext from './UserContext';

function Footer() {
    const { firstName, lastName } = react.useContext(userContext);
    return (
        <footer className="footer">
            <p>Developed by {firstName} {lastName}</p>
        </footer>
    );
}
export default Footer;