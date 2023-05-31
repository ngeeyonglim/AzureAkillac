import { useState } from "react";
import { useProfile } from "./ProfileScreen";


export default function ProfilePic() {
    const allowedFileTypes = `image/gif image/png, image/jpeg, image/x-png`;
    const editMode = useProfile();
    const [profilePic, setProfilePic] = useState("");

    const handleImageUpload = (event) => {
        let image = event.target.files[0];
        if (image) {
            const imageReader = new FileReader();
            imageReader.readAsDataURL(image);
            imageReader.onloadend = () => {
                setProfilePic(imageReader.result);
            };
        }
    };
    
    return (
        <div>
        {profilePic !== ""
        ? <img src={profilePic} alt="profile" className="profile-image"/> 
        : <img src={require("../images/profile-pic.jpg")} alt="profile" className="profile-image"/>
        }
        {editMode ? <input type="file" onChange={handleImageUpload} accept={allowedFileTypes} /> : <br/>}
        </div>
    );
}