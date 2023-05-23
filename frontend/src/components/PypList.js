export default function PypList({pyp}) {
    return (
        <>
        <h1>Results</h1>
        <table>
            <thead>
                <td>Name</td>
            </thead>
            <tbody>
                {pyp.map((pyp) =>  {
                    return (
                    <tr>
                        <td>{pyp.pypName}</td>
                    </tr> 
                );
            })}
            </tbody>
        </table>
        </>
    );
}