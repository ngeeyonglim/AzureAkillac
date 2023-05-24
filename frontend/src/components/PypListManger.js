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
  const [uploadPyp, setUploadPyp] = useState(
    {
      courseCode: "",
      pypName: ""
    }
    );
  const [courseCode, setCourseCode] = useState("");
  const [filteredCourse, setFilteredCourse] = useState("");

    const handleUploadPyp = (event) => {
      const { name, value } = event.target;
      setUploadPyp({
        ...uploadPyp,
        [name] : value
      });
    };
    
    const handleSetPyp = (event) => {
        event.preventDefault();
        setPyp([
            {
                courseCode : uploadPyp.courseCode,
                pypName : uploadPyp.pypName
            },
            ...pyp
        ]);
        setUploadPyp({
        courseCode: "",
        pypName: ""});
    };

    const handleSetCourseCode = (event) => {
        setCourseCode(event.target.value);
    };

    const handleSetFilteredCourse = (event) => {
        setFilteredCourse(courseCode);
        setCourseCode("");
    };

    useEffect(() => {
        setStoredPyp(pyp);
    }, [pyp]);

    return (
        <div>
            <NavBar courseCode={courseCode} 
            handleSetCourseCode={handleSetCourseCode}
            handleSetFilteredCourse={handleSetFilteredCourse}/>
            <SearchScreen pyp={pyp} filteredCourse={filteredCourse}/>
             <UploadScreen 
             uploadPyp={uploadPyp}
             handleUploadPyp={handleUploadPyp} 
             handleSetPyp={handleSetPyp}
             />
        </div>
    )
}