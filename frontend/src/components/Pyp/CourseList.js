import CourseCard from "./CourseCard";

export default function CourseList({ courses }) {
    
    return (
        <div className="list">
        <h1 className="list-header">Courses</h1>
        <table>
            <thead>
                <tr>
                    <th>{courses.length} Courses Found</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((courseCode, i) =>  {
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