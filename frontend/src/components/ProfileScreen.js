import { useState } from "react";
import NavBar from "./NavBar";

export default function ProfileScreen() {
    const [editMode, setEditMode] = useState(false);
    const handleEdit = () => {
        setEditMode(!editMode);
    };
    return (
        <div className="profilescreen">
            <NavBar />
            <h1>ProfileScreen</h1>
            {editMode && <p><input type="text"></input></p>}
            <button onClick={handleEdit} className="edit-button">Edit Profile</button>
        </div>
    );
}