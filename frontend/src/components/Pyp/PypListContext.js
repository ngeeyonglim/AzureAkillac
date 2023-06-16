import { useState, useEffect, useContext, createContext } from "react";

const CourseListContext = createContext();
const PypListUpdateContext = createContext();
const FilteredCourseCodeContext = createContext();

export function useCourseList() {
    return useContext(CourseListContext);
}

export function useUpdatePypList() {
    return useContext(PypListUpdateContext);
}

export function useFilteredCourseCode() {
    return useContext(FilteredCourseCodeContext);
}

export function PypListProvider({ children }) {
    // courses is the state variable that holds the array of courses
    const [courses, setCourses] = useState([]);

    // uploadPyp is the state variable that holds the pyp to be uploaded
    const [uploadPyp, setUploadPyp] = useState({
        courseCode: "",
        pypYear1: "",
        pypYear2: "",
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
    
    // check if the pyp to be uploaded is valid
    function isValidUpload(pyp) {
        return pyp.courseCode && pyp.pypYear1 && 
        parseInt(pyp.pypYear2) - 1 === parseInt(pyp.pypYear1) && 
        pyp.semester && pyp.midOrFinals && 
        pyp.ansOrQuestions && pyp.file.length > 0;
    }

    // push pyp to backend and pull again to update list
    // and resets upload input fields
    const handleSetPyps = (event) => {
        event.preventDefault();
        if (!isValidUpload(uploadPyp)) {
            alert("Invalid upload");
        } else {
            const uploadFile = async () => {
                const formData = new FormData();
                formData.append('courseCode', uploadPyp.courseCode);
                formData.append('pypYear', uploadPyp.pypYear1 + uploadPyp.pypYear2);
                formData.append('semester', uploadPyp.semester);
                formData.append('midOrFinals', uploadPyp.midOrFinals);
                formData.append('ansOrQuestions', uploadPyp.ansOrQuestions);
                formData.append('file', uploadPyp.file[0]);

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
            fetchCourses();
            setUploadPyp({
                courseCode: "",
                pypYear1: "",
                pypYear2: "",
                semester: "",
                midOrFinals: "",
                ansOrQuestions: "",
                file: []
            });
        }
    };

    // fetch list of courses from backend
    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/getCourses`, { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };


    // fetch list of pyps of specific course from backend
    const fetchPypNames = async (courseCode, setPyps) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/getYears?courseCode=${courseCode}`, { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                setPyps(data);
            }
        } catch (error) {
            console.error('Error fetching Pyp names:', error);
        }
    };


    // fetch files of respective pyp from backend
    const fetchPypFiles = async (courseCode, pypYear, semester, midOrFinals, setFiles) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/getFileNames?courseCode=${courseCode}&pypYear=${pypYear}&semester=${semester}&midOrFinals=${midOrFinals.substring(0,2)}`, { method: 'GET' });
            if (response.ok) {
                const data = await response.json();
                setFiles(data);
            }
        } catch (error) {
            console.error('Error fetching Pyp files:', error);
        }
    };


    // upon rendering homescreen fetch list of courses from backend
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <CourseListContext.Provider value={{ courses, fetchPypFiles, fetchPypNames }}>
            <PypListUpdateContext.Provider 
                value={{handleSetPyps, handleUploadPyp, uploadPyp}}>
                    <FilteredCourseCodeContext.Provider 
                        value={{courseCode, 
                        handleSetCourseCode, 
                        handleResetCourseCode}}>
                        {children}
                    </FilteredCourseCodeContext.Provider>
            </PypListUpdateContext.Provider>
        </CourseListContext.Provider>
    );
}