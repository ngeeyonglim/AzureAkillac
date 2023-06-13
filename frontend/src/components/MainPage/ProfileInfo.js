import { useEdit } from "./ProfileScreen";
import { useState, useEffect } from "react";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";
import ProfileCard from "./ProfileCard";

export default function ProfileInfo() {
    const editMode = useEdit();
    const { profile, handleUser } = useUser();
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");

    const handleNameChange = () => {
        updateProfile(profile.uid, { name: name});
        handleUser();
    };

    const handleMajorChange = () => {
        updateProfile(profile.uid, { major: major });
        handleUser();
    };

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setMajor(profile.major);
        }
    }, [profile]);

    return (
        <div className="profileinfo">
            {editMode ? 
            <h1>
                Name: 
                <input type="text" 
                    className="profilecard" 
                    value={name}
                    onChange={event => setName(event.target.value)}>
                </input> 
                <button onClick={handleNameChange}>
                    Confirm
                </button>
            </h1>
            : <h1 className="p">Name: <ProfileCard input={name} /></h1>}
            {editMode ? 
            <h1>
                Major: 
                <input type="text" 
                    className="profilecard" 
                    value={major}
                    onChange={event => setMajor(event.target.value)}>
                </input> 
                <button onClick={handleMajorChange}>
                    Confirm
                </button>
            </h1>
            : <h1 className="p">Major: <ProfileCard input={major} /></h1>}
        </div>
    );
}
