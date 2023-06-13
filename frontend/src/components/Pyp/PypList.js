import CourseCard from "./CourseCard";

export default function PypList({pyp}) {
    return (
        <div className="list">
        <h1 className="list-header">Courses</h1>
        <table>
            <thead>
                <tr>
                    <th>{pyp.length} Courses Found</th>
                </tr>
            </thead>
            <tbody>
                {pyp.map((courseCode, i) =>  {
                    return (
                    <tr key={i}>
                        <CourseCard courseCode={courseCode} />
                    </tr> 
                );
            })}
            </tbody>
        </table>
        </div>
    );
}