import EmptyList from "./EmptyList";
import NavBar from "./NavBar";
import PypList from "./PypList";
import { usePypList, useFilteredCourseCode } from "./PypListContext";

export default function SearchScreen() {
    const pyp = usePypList();
    const { courseCode } = useFilteredCourseCode();
    const filteredPyp = pyp.filter((pyp) => 
        courseCode.toLowerCase() === pyp.courseCode
                                            .slice(0, courseCode.length)
                                            .toLowerCase());
                                            
    return (
        <div>
            <NavBar />
            {filteredPyp.length > 0 
            ? <PypList pyp={filteredPyp} /> 
            : <EmptyList />}
        </div>
    );
}