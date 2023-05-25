import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function NavBar({courseCode, handleSetCourseCode, handleResetCourseCode}) {

    // Logs out the user    
    const handleLogOutClick = () => {
        supabase.auth.signOut();
    };

    return (
        <div className="navbar">
        <nav>
            <ul className="navlist">
                {/* Logo that links to the home page */}
                <li><Link to="/">
                    <img alt="logo" 
                     src={require("../images/logo.png")} 
                     className="page-logo"/>
                </Link></li>
                {/* Search bar that links to the search page */}
                <li><Link to="/search">
                    <input type="text" 
                    value={courseCode}
                    onChange={handleSetCourseCode}
                    onClick={handleResetCourseCode}
                    className="search-bar" 
                    placeholder="Search Courses"></input>
                 </Link></li>
            </ul>
        </nav>
            <h1 className="header">
                AkillaC
            </h1>
                <img alt="search" 
                src={require("../images/search-logo.png")} 
                className="search-button"/>
            {/* Button that logout */}
            <button className = "logout-button" onClick = {handleLogOutClick}>
                LOGOUT
            </button>
        </div>
    );
}