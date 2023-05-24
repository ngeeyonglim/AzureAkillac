export default function PypList({pyp}) {
    return (
        <>
        <h1>Past Year Papers</h1>
        <table>
            <thead>
                <tr>
                <th>Course</th>
                <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {pyp.map((pyp) =>  {
                    return (
                    <tr>
                        <td>{pyp.courseCode}</td>
                        <td>{pyp.pypName}</td>
                    </tr> 
                );
            })}
            </tbody>
        </table>
        </>
    );
}