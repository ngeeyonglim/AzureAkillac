import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function NavBar({courseCode, 
    handleSetCourseCode, handleSetFilteredCourse}) {

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
                    onClick={handleSetFilteredCourse}
                    onChange={handleSetCourseCode}
                    className="search-bar" 
                    placeholder="Search Courses"></input>
                 </Link></li>
            </ul>
        </nav>
            <h1 className="header">
                AkillaC
            </h1>
            {/* Button that confirms the search input and search for pyps */}
            <button type="submit"
                onClick={handleSetFilteredCourse} 
                className="search-button-submit">
                <img alt="search" 
                src={require("../images/search-logo.png")} 
                className="search-button"/>
            </button>
            {/* Button that logout */}
            <button className = "logout-button" onClick = {handleLogOutClick}>
                LOGOUT
            </button>
        </div>
    );
}