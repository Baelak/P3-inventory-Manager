import  {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
        <h1>KYM Inventory Management Application</h1>
        <nav>
                <Link to="/profile">Profile</Link> 
                <Link id="logout" to="#">Logout</Link> 
                <Link to="/login">Login</Link> 
                <Link to="/signup">Sign Up</Link>
        </nav>
    </header>
    )
}


export default Header;