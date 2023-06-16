import { useState, useEffect } from "react";
import { useCourseList } from "./PypListContext";
import NavBar from "../NavBar";


export default function Pyp({ pypName }) {
    const { fetchPypFiles } = useCourseList();
    const [files, setFiles] = useState(null);
    const { courseCode, pypYear, semester, midOrFinals } = pypName;

    useEffect(() => {
        fetchPypFiles(courseCode, pypYear, semester, midOrFinals, setFiles);
    }, [courseCode, pypYear, semester, midOrFinals, fetchPypFiles]);

    return (
        <div>
            <NavBar />
            <h1>{ courseCode }</h1>
            <h1>I DID IT</h1>
        </div>
    );
}