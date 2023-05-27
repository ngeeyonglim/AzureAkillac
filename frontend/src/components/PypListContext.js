import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const PypListContext = createContext();
const PypListUpdateContext = createContext();
const FilteredCourseCodeContext = createContext();

export function usePypList() {
    return useContext(PypListContext);
}

export function useUpdatePypList() {
    return useContext(PypListUpdateContext);
}

export function useFilteredCourseCode() {
    return useContext(FilteredCourseCodeContext);
}

// get the stored pyps from local storage
// here is the function that will pull pyps from database
function getStoredPyps() {
//   const rawPyps = window.localStorage.getItem("pyps");
//   if (rawPyps != null) {
//     return JSON.parse(rawPyps);
//   } else {
//     return [];
//   }
    JSON.parse(JSON.stringify(axios({
        method: "GET",
        url:"/getFileName"})));
    //     .then((response) => {
    //     const res =response.data
    //     setProfileData(({
    //         profile_name: res.courseCode,
    //         about_me: res.about}))
    //     }).catch((error) => {
    //     if (error.response) {
    //         console.log(error.response)
    //         console.log(error.response.status)
    //         console.log(error.response.headers)
    //     }
    // })
}

// store the pyp in local storage
// here is the function that will push pyps to database
function setStoredPyp(newPyp) {
  window.localStorage.setItem("pyps", JSON.stringify(newPyp));
}

export function PypListProvider({ children }) {
    // pyp is the state variable that holds the array of pyps
    const [pyp, setPyp] = useState(getStoredPyps());

    // uploadPyp is the state variable that holds the pyp to be uploaded
    const [uploadPyp, setUploadPyp] = useState({
        courseCode: "",
        pypYear: "",
        semester: "",
        midOrFinals: "",
        ansOrQuestions: "",
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
    
    // appends pyp to the front of the array 
    // and resets upload input fields
    const handleSetPyp = (event) => {
        event.preventDefault();
        setPyp([{
            courseCode : uploadPyp.courseCode,
            pypYear : uploadPyp.pypYear,
            semester : uploadPyp.semester,
            midOrFinals : uploadPyp.midOrFinals,
            ansOrQuestions : uploadPyp.ansOrQuestions,
            file : uploadPyp.file
            },
            ...pyp
        ]);
        setUploadPyp({
            courseCode: "",
            pypYear: "",
            semester: "",
            midOrFinals: "",
            ansOrQuestions: "",
            file: []
        });
    };
    // holds the desired course code to search for
    const [courseCode, setCourseCode] = useState("");

    // set the course code to be searched
    const handleSetCourseCode = (event) => {
        event.preventDefault();
        setCourseCode(event.target.value);
    };

    // reset search input field
    const handleResetCourseCode = (event) => {
        setCourseCode("");
    };

    // Ensure the each time a pyp is added it is stored to the local storage
    useEffect(() => {
        setStoredPyp(pyp);
    }, [pyp]);

    return (
        <PypListContext.Provider value={pyp}>
            <PypListUpdateContext.Provider 
                value={{handleSetPyp, handleUploadPyp, uploadPyp}}>
                <FilteredCourseCodeContext.Provider 
                    value={{courseCode, 
                    handleSetCourseCode, 
                    handleResetCourseCode}}>
                    {children}
                </FilteredCourseCodeContext.Provider>
            </PypListUpdateContext.Provider>
        </PypListContext.Provider>
    );
}