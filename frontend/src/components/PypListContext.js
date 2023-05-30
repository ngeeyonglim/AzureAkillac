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

export function PypListProvider({ children }) {
    // pyp is the state variable that holds the array of pyps
    const [pyp, setPyp] = useState([]);

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

    // upon rendering homescreen fetch list of pyps from backend
    useEffect(() => {
        fetch("http://127.0.0.1:5000/getFileNames", {method : 'GET'})
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            setPyp(data);
        });
    }, []);

    useEffect(() => {
        const uploadFile = async () => {
        const formData = new FormData();
        formData.append('courseCode', pyp[0].courseCode);
        formData.append('pypYear', pyp[0].pypYear);
        formData.append('semester', pyp[0].semester);
        formData.append('midOrFinals', pyp[0].midOrFinals);
        formData.append('ansOrQuestions', pyp[0].ansOrQuestions);
        formData.append('file', pyp[0].file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData,
            });

            if (response.ok) {
            // File uploaded successfully
            console.log('File uploaded successfully');
            } else {
            // Handle error response
            console.error('Error uploading file');
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    };
    uploadFile();
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