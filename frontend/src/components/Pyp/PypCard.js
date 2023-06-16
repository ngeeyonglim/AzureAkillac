import { Link } from "react-router-dom"

export default function PypCard({ pypName }) {
    const { courseCode, pypYear, semester, midOrFinals } = pypName;

    return (
        <td className="card">
            <Link to={`/search/${courseCode}/${pypYear}${semester}${midOrFinals}`} className="card-link">
            <p>20{ pypYear.substring(0, 2) }/20{pypYear.substring(2, 4)}</p>
            <p>{ semester.substring(0, 3) } {semester.substring(3, 4)}</p>
            <p>{ midOrFinals }</p>
            <p>Paper</p>
            </Link>
        </td>
    )
}