import { Link } from "react-router-dom";

export default function Card({ pyp }) {
    const {courseCode, 
        pypYear, 
        semester, 
        midOrFinals, 
        ansOrQuestions} = pyp;

    return (
        <td className="card">
            <p>{ courseCode }</p>
            <p>{ pypYear.slice(0,2)}/{pypYear.slice(2,4)}</p>
            <p>{ semester }</p>
            {midOrFinals === "Mid" ? <p>Midterms</p> : <p>Finals</p>}
            <p>{ ansOrQuestions }</p>
            <Link to={`/search/${courseCode + pypYear + semester + midOrFinals}`}>View</Link>
        </td>
    )
}