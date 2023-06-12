import { useEffect, useState } from "react";
import { useEdit } from "./ProfileScreen";
import { useUser } from "../../App";
import { updateProfile } from "../../firebase";
import ImageCrop from "./ImageCrop";


export default function ProfilePic() {
    const { profile, handleUser } = useUser();
    const editMode = useEdit();
    const [profilePic, setProfilePic] = useState(require("../../images/profile-pic.jpg"));
    const handleImageUpload = (image) => {
        updateProfile(profile.uid, { photoUrl: image });
        handleUser();
    };

    useEffect(() => {
        if (profile?.photoUrl) {
            setProfilePic(profile.photoUrl);
        }
    }, [profile]);

    return (
        <div>
        <img src={profilePic} alt="profile" className="profile-image"/> 
        {editMode 
        ? <ImageCrop handleImageUpload={handleImageUpload} /> 
        : <br />}
        </div>
    );
}