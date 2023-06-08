import { Link } from "react-router-dom";

export default function ProfileTab() {
    return (
        <div className="profiletab">
        <Link to="/profile">
            <button className="profiletab-button">
                View Profile
            </button>
        </Link>
            <h1>ProfileTab</h1>
            <p>Work still in development. We apologise for the inconvenience...</p>
        </div>
    )
}