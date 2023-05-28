import { useState, useEffect, useContext, createContext } from "react";

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
  return [{courseCode: "CS2040S", pypYear: "2019", semester: "sem1", midOrFinals: "Fin", ansOrQuestions: "Answers"}];
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

    useEffect(() => {
        fetch("http://127.0.0.1:5000/getFileNames").then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            setPyp(data);
        });
    }, []);

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