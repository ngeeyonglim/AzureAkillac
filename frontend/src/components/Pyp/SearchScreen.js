import EmptyList from "./EmptyList";
import NavBar from "../NavBar";
import PypList from "./PypList";
import { usePypList, useFilteredCourseCode } from "./PypListContext";

export default function SearchScreen() {

    const pyp = usePypList();
    console.log(pyp);
    const { courseCode } = useFilteredCourseCode();
    const filteredPyp = pyp.filter(pyp => 
        pyp.courseCode.toLowerCase().includes(courseCode.toLowerCase()));
        
    return (
        <div>
            <NavBar />
            {filteredPyp.length > 0 
            ? <PypList pyp={filteredPyp} /> 
            : <EmptyList />}
        </div>
    );
}