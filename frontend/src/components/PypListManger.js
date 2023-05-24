import { useState, useEffect } from "react";
import SearchScreen from "./SearchScreen";
import UploadScreen from "./UploadScreen";
import NavBar from "./NavBar";

function getStoredPyps() {

  // get the stored pyps from local storage
  const rawPyps = window.localStorage.getItem("pyps");
  if (rawPyps != null) {
    return JSON.parse(rawPyps);
  } else {
    return [];
  }
}

// store the pyp in local storage
function setStoredPyp(newPyp) {
  window.localStorage.setItem("pyps", JSON.stringify(newPyp));
}

export default function PypListManager() {

  // pyp is the state variable that holds the array of pyps
  const [pyp, setPyp] = useState(getStoredPyps());

  // uploadPyp is the state variable that holds the pyp to be uploaded
  const [uploadPyp, setUploadPyp] = useState({
      courseCode: "",
      pypName: ""
    });

  // update the state of pyp to be uploaded
  const handleUploadPyp = (event) => {
    const { name, value } = event.target;
    setUploadPyp({
      ...uploadPyp,
      [name] : value
    });
  };
    
  // appends pyp to the front of the array and resets upload input fields
  const handleSetPyp = (event) => {
      event.preventDefault();
      setPyp([{
        courseCode : uploadPyp.courseCode,
        pypName : uploadPyp.pypName
      },
        ...pyp
      ]);
      setUploadPyp({
        courseCode: "",
        pypName: ""});
  };

  // holds the desired course code to search for
  const [courseCode, setCourseCode] = useState("");

  // execute the filtered course code
  const [filteredCourse, setFilteredCourse] = useState("");

  // set the course code to be searched
  const handleSetCourseCode = (event) => {
      setCourseCode(event.target.value);
  };

  // set filtered course code and reset course code input field
  const handleSetFilteredCourse = (event) => {
      setFilteredCourse(courseCode);
      setCourseCode("");
  };

  // Ensure the each time pyp is added it is stored to the local storage
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
        handleSetPyp={handleSetPyp} />
    </div>
  )
}