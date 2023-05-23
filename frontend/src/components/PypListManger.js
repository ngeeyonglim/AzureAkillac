import { useState, useEffect } from "react";
import SearchScreen from "./SearchScreen";
import UploadScreen from "./UploadScreen";
import NavBar from "./NavBar";

function getStoredPyps() {
  const rawPyps = window.localStorage.getItem("pyps");
  if (rawPyps != null) {
    return JSON.parse(rawPyps);
  } else {
    return [];
  }
}

function setStoredPyp(newPyp) {
  window.localStorage.setItem("pyps", JSON.stringify(newPyp));
}

export default function PypListManager() {
    const [pyp, setPyp] = useState(getStoredPyps());
    const [uploadPyp, setUploadPyp] = useState("");

    const handleUploadPyp = (event) => {
        setUploadPyp(event.target.value);
    };
    
    const handleSetPyp = (event) => {
        event.preventDefault();
        setPyp([
            {
                pypName : uploadPyp
            },
            ...pyp
        ]);
        setUploadPyp("");
    };

    useEffect(() => {
        setStoredPyp(pyp);
    }, [pyp]);

    return (
        <div>
            <NavBar />
            {pyp && <SearchScreen pyp={pyp} />}
             <UploadScreen 
             uploadPyp={uploadPyp}
             handleUploadPyp={handleUploadPyp} 
             handleSetPyp={handleSetPyp}
             />
        </div>
    )
}