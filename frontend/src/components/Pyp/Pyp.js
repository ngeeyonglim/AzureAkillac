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

    console.log(files);

    return (
        <div>
            <NavBar />
            <h1>{ courseCode }</h1>
            <h1>{ pypYear }</h1>
            <h1>{ semester }</h1>
            <h1>{ midOrFinals }</h1>
            <a href={files[0].file} target="blank">view</a>
        </div>
    );
}