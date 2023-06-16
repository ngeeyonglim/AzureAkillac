import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCourseList } from "./PypListContext";

export default function CourseCard({ courseCode }) {
    const { fetchPypNames } = useCourseList();
    const [pypNames, setPypNames] = useState([]);

    useEffect(() => {
        fetchPypNames(courseCode.courseCode, setPypNames);
    }, [courseCode.courseCode, fetchPypNames]);

    return (
        <td className="card">
            <Link to={`/search/${courseCode.courseCode}`} className="card-link">
            <p>{ courseCode.courseCode }</p>
            <p>({ pypNames.length } Papers Found)</p>
            </Link>
        </td>
    )
}