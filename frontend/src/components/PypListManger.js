import { useState, useEffect } from "react";
import SearchScreen from "./SearchScreen";
import UploadScreen from "./UploadScreen";
import NavBar from "./NavBar";

function getStoredPyps() {

  // get the stored pyps from local storage
  // here is the function that will pull pyps from database
  const rawPyps = window.localStorage.getItem("pyps");
  if (rawPyps != null) {
    return JSON.parse(rawPyps);
  } else {
    return [];
  }
}

// store the pyp in local storage
// here is the function that will push pyps to database
function setStoredPyp(newPyp) {
  window.localStorage.setItem("pyps", JSON.stringify(newPyp));
}

export default function PypListManager() {

  // pyp is the state variable that holds the array of pyps
  const [pyp, setPyp] = useState(getStoredPyps());

  // uploadPyp is the state variable that holds the pyp to be uploaded
  const [uploadPyp, setUploadPyp] = useState({
      courseCode: "",
      pypYear: "",
      semester: "",
      type: "",
      file: []
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
        pypYear : uploadPyp.pypYear,
        semester : uploadPyp.semester,
        type : uploadPyp.type,
        file : uploadPyp.file
      },
        ...pyp
      ]);
      setUploadPyp({
        courseCode: "",
        pypYear: "",
        semester: "",
        type: "",
        file: []
      });
  };

  // holds the desired course code to search for
  const [courseCode, setCourseCode] = useState("");

  // set the course code to be searched
  const handleSetCourseCode = (event) => {
      setCourseCode(event.target.value);
  };

  // reset search input field
  const handleResetCourseCode = (event) => {
    event.preventDefault();
    setCourseCode("");
  };

  // Ensure the each time a pyp is added it is stored to the local storage
  useEffect(() => {
      setStoredPyp(pyp);
  }, [pyp]);

  return (
    <div>
      <NavBar courseCode={courseCode} 
        handleSetCourseCode={handleSetCourseCode}
        handleResetCourseCode={handleResetCourseCode}/>
      <SearchScreen pyp={pyp} courseCode={courseCode}/>
      <UploadScreen 
        uploadPyp={uploadPyp}
        handleUploadPyp={handleUploadPyp} 
        handleSetPyp={handleSetPyp} />
    </div>
  )
}