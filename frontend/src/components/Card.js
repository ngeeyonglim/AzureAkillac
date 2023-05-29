export default function Card({ pyp }) {
    const {courseCode, 
        pypYear, 
        semester, 
        midOrFinals, 
        ansOrQuestions} = pyp;
    return (
        <td className="card">
            { courseCode && <p className="test">{ courseCode }</p>}
            { pypYear && <p>{ pypYear }</p>}
            { semester && <p>{ semester }</p>}
            { midOrFinals && <p>{ midOrFinals }</p>}
            { ansOrQuestions && <p>{ ansOrQuestions }</p>}
        </td>
    )
}