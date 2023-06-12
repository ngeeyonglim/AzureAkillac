import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Card({ courseCode }) {
    const [fileNames, setFileNames] = useState([]);

    const getFileNames = (courseCode) => {
        fetch(`http://127.0.0.1:5000/getFileNames?courseCode=${courseCode.courseCode}`, { method: 'GET' })
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

    return (
        <td className="card">
            <Link to={`/search/${courseCode.courseCode}`} className="card-link">
            <p>{ courseCode.courseCode }</p>
            <p>({ fileNames.length } Papers Found)</p>
            </Link>
        </td>
    )
}