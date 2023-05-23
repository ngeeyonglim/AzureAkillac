import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function NavBar() {

    const handleLogOutClick = () => {
        supabase.auth.signOut();
    };

    return (
        <div className="navbar">
        <nav>
            <ul className="navlist">
                <li><Link to="/">
                    <img alt="logo" 
                     src={require("../images/logo.png")} 
                     className="page-logo"/>
                </Link></li>
                <li><Link to="/search">
                    <input type="text" 
                className="search-bar" 
                placeholder="Search for Courses"></input>
                 </Link></li>
            </ul>
        </nav>
            <h1 className="header">
                AkillaC
            </h1>
                <img alt="search" 
                src={require("../images/search-logo.png")} 
                className="search-button"/>
            <button className = "logout-button" onClick = {handleLogOutClick}>
                LOGOUT
            </button>
        </div>
    );
}