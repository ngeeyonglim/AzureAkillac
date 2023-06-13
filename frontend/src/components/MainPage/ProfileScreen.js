import { useState, useContext, createContext } from "react";
import NavBar from "../NavBar";
import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";

const EditContext = createContext();

export function useEdit() {
    return useContext(EditContext);
}

export default function ProfileScreen() {
    const [editMode, setEditMode] = useState(false);
    const handleEdit = () => {
        setEditMode(!editMode);
    };
    return (
        <EditContext.Provider value={editMode}>
            <div className="profilescreen">
                <NavBar />
                <ProfilePic />
                <ProfileInfo />
                <button onClick={handleEdit} className="edit-button">Edit Profile</button>
            </div>
        </EditContext.Provider>
    );
}