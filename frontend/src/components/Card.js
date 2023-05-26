export default function Card({ pyp }) {
    const {courseCode, 
        pypYear, 
        semester, 
        midOrFinals, 
        ansOrQuestions} = pyp;
    return (
        <div className="card">
            {courseCode && <td>{courseCode}</td>}
            {pypYear && <td>{pypYear}</td>}
            {semester && <td>{semester}</td>}
            {midOrFinals && <td>{midOrFinals}</td>}
            {ansOrQuestions && <td>{ansOrQuestions}</td>}
        </div>
    )
}