import { useState, useEffect } from "react";
import { useCourseList } from "./PypListContext";
import NavBar from "../NavBar";


export default function Pyp({ pypName }) {
    const { fetchPypFiles } = useCourseList();
    const [files, setFiles] = useState([]);
    const { courseCode, pypYear, semester, midOrFinals } = pypName;

    useEffect(() => {
        fetchPypFiles(courseCode, pypYear, semester, midOrFinals, setFiles);
    }, [courseCode, pypYear, semester, midOrFinals, fetchPypFiles]);

    const qns = files.filter(file => file.ansOrQuestions === "Questions");
    const ans = files.filter(file => file.ansOrQuestions === "Answers");

    return (
        <div>
            <NavBar />
            <h1 className="pyp-title">
                { courseCode } 20{ pypYear.substring(0, 2) }/20{pypYear.substring(2, 4)} { semester.substring(0, 3) } { semester.substring(3, 4)} { midOrFinals }
            </h1>
            <ul className="pyp-list">
                <li>{qns.length > 0
                    ? <a href={qns[0].file} target="_blank" rel="noreferrer" className="pyp-link">Click here to View Questions</a> 
                    : <p>Questions not available</p>} 
                </li>
                <li>{ans.length > 0
                    ? <a href={ans[0].file} target="_blank" rel="noreferrer" className="pyp-link">Click here to View Answers</a> 
                    : <p>Answers not available</p>}
                </li>
            </ul>
        </div>
    );
}