import { useEdit } from "./ProfileScreen";
import { useState, useEffect } from "react";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";

export default function ProfileInfo() {
    const editMode = useEdit();
    const { profile, handleUser } = useUser();
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");

    const handleNameChange = async () => {
        await updateProfile(profile.uid, { name: name });
        handleUser();
    };

    const handleMajorChange = async () => {
        await updateProfile(profile.uid, { major: major });
        handleUser();
    };

    useEffect(() => {
        if (profile?.name) {
            setName(profile.name);
        }
    }, [profile]);

    useEffect(() => {
        if (profile?.major) {
            setMajor(profile.major);
        }
    }, [profile]);

    return (
        <div className="profileinfo">
            {editMode ? 
            <div className="profileData">
                <h1>Name: </h1>
                <input type="text" 
                    className="profilecard" 
                    value={name}
                    style={{fontWeight: "bold",
                            fontSize: "1.5rem",
                            width: "600px"}}
                    onChange={event => setName(event.target.value)}>
                </input> 
                <button onClick={handleNameChange} className="confirm-button">
                    Confirm
                </button>
            </div>
            : (
            <div className="profileData">
                <h1>Name: </h1>
                <h2 className="profilecard">{name}</h2>
            </div>
            )}
            {editMode ? 
            <div className="profileData">
                <h1>Major: </h1>
                <input type="text" 
                    className="profilecard" 
                    value={major}
                    style={{fontWeight: "bold",
                            fontSize: "1.5rem",
                            width: "600px"}}
                    onChange={event => setMajor(event.target.value)}>
                </input> 
                <button onClick={handleMajorChange} className="confirm-button">
                    Confirm
                </button>
            </div>
            : (
            <div className="profileData">
                <h1>Major: </h1>
                <h2 className="profilecard">{major}</h2>
            </div>
            )}
        </div>
    );
}
