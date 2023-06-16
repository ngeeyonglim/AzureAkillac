import { Link } from "react-router-dom"

export default function PypCard({ pypName }) {
    return (
        <td className="card">
            <Link to={`/search/${pypName.courseCode}/${pypName.pypYear}${pypName.semester}${pypName.midOrFinals}`} className="card-link">
            <p>{ pypName.pypYear }</p>
            <p>{ pypName.semester }</p>
            <p>{ pypName.midOrFinals }</p>
            </Link>
        </td>
    )
}