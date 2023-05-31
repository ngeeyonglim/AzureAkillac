import { useState, useContext, createContext } from "react";
import NavBar from "./NavBar";
import ProfilePic from "./ProfilePic";

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export default function ProfileScreen() {
    const [editMode, setEditMode] = useState(false);
    const handleEdit = () => {
        setEditMode(!editMode);
    };
    return (
        <ProfileContext.Provider value={editMode}>
            <div className="profilescreen">
                <NavBar />
                <ProfilePic />
                {editMode ? <p>Hello</p> : <br/>}
                <button onClick={handleEdit} className="edit-button">Edit Profile</button>
            </div>
        </ProfileContext.Provider>
    );
}