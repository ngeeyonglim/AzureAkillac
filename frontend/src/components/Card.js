export default function Card({ pyp }) {
    const {courseCode, 
        pypYear, 
        semester, 
        midOrFinals, 
        ansOrQuestions,
        file} = pyp;
    return (
        <td className="card">
            <p>{ courseCode }</p>
            <p>{ pypYear.slice(0,2)}/{pypYear.slice(2,4)}</p>
            <p>{ semester }</p>
            {midOrFinals === "Mid" ? <p>Midterms</p> : <p>Finals</p>}
            <p>{ ansOrQuestions }</p>
            <a href="https://firebasestorage.googleapis.com/v0/b/akillac-f1499.appspot.com/o/CS1231S_1819Sem1FinAnswers?alt=media&token=55c9ce53-6b8a-4e0f-993c-32205825db9c" target="blank">View</a>
        </td>
    )
}