const Header = () => {
    return <div className="nav-container main-container">
        <div className="logo-container">
            <img className="logo" src="https://png.pngtree.com/template/20191024/ourmid/pngtree-food-delivery-logo-design-fast-delivery-service-sign-image_323015.jpg" />
        </div>
        <div className="nav-items">
            <ul className="nav-lists">
                <li className="list-items">Home</li>
                <li className="list-items">About</li>
                <button>Login</button>
            </ul>
        </div>
    </div>
}

export default Header;