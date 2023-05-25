export default function PypList({pyp}) {
    return (
        <div className="list">
        <h1>Past Year Papers</h1>
        <table>
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Semester</th>
                    <th>Midterms/Finals</th>
                    <th>Qns/Ans</th>
                </tr>
            </thead>
            <tbody>
                {pyp.map((pyp, i) =>  {
                    return (
                    <tr key={i}>
                        <td>{pyp.courseCode}</td>
                        <td>{pyp.pypYear}</td>
                        <td>{pyp.semester}</td>
                        <td>{pyp.midorFinals}</td>
                        <td>{pyp.type}</td>
                    </tr> 
                );
            })}
            </tbody>
        </table>
        </div>
    );
}