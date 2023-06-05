export default function Card({ pyp }) {
    const {courseCode, 
        pypYear, 
        semester, 
        midOrFinals, 
        ansOrQuestions,
        file} = pyp;
        console.log(file)
    return (
        <td className="card">
            <p>{ courseCode }</p>
            <p>{ pypYear.slice(0,2)}/{pypYear.slice(2,4)}</p>
            <p>{ semester }</p>
            {midOrFinals === "Mid" ? <p>Midterms</p> : <p>Finals</p>}
            <p>{ ansOrQuestions }</p>
            <a href={file} target="blank">View</a>
        </td>
    )
}