import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function NavBar({courseCode, handleSetCourseCode, handleSetFilteredCourse}) {

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
                <button type="submit"
                onClick={handleSetFilteredCourse} 
                className="search-button-submit">
                    <img alt="search" 
                    src={require("../images/search-logo.png")} 
                    className="search-button"/>
                </button>
            <button className = "logout-button" onClick = {handleLogOutClick}>
                LOGOUT
            </button>
        </div>
    );
}