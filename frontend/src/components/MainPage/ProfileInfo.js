import { useEdit } from "./ProfileScreen";
import { useState, useEffect } from "react";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";

export default function ProfileInfo() {
    const editMode = useEdit();
    const { profile } = useUser();
    const [name, setName] = useState("");
    const [major, setMajor] = useState("");

    // update the name and major in the database
    const handleNameChange = async (event) => {
        setName(event.target.value);
        await updateProfile(profile.uid, { name: event.target.value });
    };

    const handleMajorChange = async (event) => {
        setMajor(event.target.value);
        await updateProfile(profile.uid, { major: event.target.value });
    };

    // update the name and major in the component upon loading the profile
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
                    onChange={handleNameChange}>
                </input> 
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
                    onChange={handleMajorChange}>
                </input> 
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
