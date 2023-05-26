import Card from "./Card";

export default function PypList({pyp}) {
    return (
        <div className="list">
        <h1>Past Year Papers</h1>
        <table>
            <thead>
                <tr>
                    <th>{pyp.length} Papers Found</th>
                </tr>
            </thead>
            <tbody>
                {pyp.map((pyp, i) =>  {
                    return (
                    <tr key={i}>
                        <Card pyp={pyp} />
                    </tr> 
                );
            })}
            </tbody>
        </table>
        </div>
    );
}