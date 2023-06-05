import { useState } from "react";
import { useProfile } from "./ProfileScreen";
import ImageCrop from "./ImageCrop";


export default function ProfilePic() {
    const editMode = useProfile();
    const [profilePic, setProfilePic] = useState("");

    const handleImageUpload = (image) => {
        setProfilePic(image);
    };
    
    return (
        <div>
        {profilePic !== ""
        ? <img src={profilePic} alt="profile" className="profile-image"/> 
        : <img src={require("../images/profile-pic.jpg")} alt="profile" className="profile-image"/>
        }
        {editMode 
        ? <ImageCrop handleImageUpload={handleImageUpload} /> 
        : <br/>}
        </div>
    );
}