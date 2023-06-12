import NavBar from "../NavBar";
import { useState, useEffect } from "react";

export default function Pyp({ courseCode }) {
    const [fileNames, setFileNames] = useState(null);

    const getFileNames = (courseCode) => {
        fetch(`http://127.0.0.1:5000/getFileNames?courseCode=${courseCode}`, { method: 'GET' })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            setFileNames(data);
        });
    };

    useEffect(() => {
        getFileNames(courseCode);
    }, [courseCode]);

    console.log(fileNames);
    return (
        <div>
            <NavBar />
            <h1>{ courseCode }</h1>
            <table>
                <thead>
                    <tr>
                        <th>{ fileNames ? fileNames.length : 0 } Papers Found</th>
                    </tr>
                </thead>
                <tbody>
                    {fileNames && fileNames.map((fileName, i) =>  {
                        return (
                        <tr key={i}>
                            <td>{fileName.pypYear}</td>
                            <td>{fileName.semester}</td>
                            <td>{fileName.midOrFinals}</td>
                            <td><a href={fileName.file} target="blank">View</a></td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}