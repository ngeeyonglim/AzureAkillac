import EmptyList from "./EmptyList";
import NavBar from "../NavBar";
import PypList from "./PypList";
import { useCourseList, useFilteredCourseCode } from "./PypListContext";

export default function SearchScreen() {
    const courses = useCourseList();
    const { courseCode } = useFilteredCourseCode();
    const filteredPyp = courses.filter(course => 
        course.courseCode.toLowerCase().includes(courseCode.toLowerCase()));
        
    return (
        <div>
            <NavBar />
            {filteredPyp.length > 0 
            ? <PypList pyp={filteredPyp} /> 
            : <EmptyList />}
        </div>
    );
}