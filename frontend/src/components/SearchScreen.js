import EmptyList from "./EmptyList";
import PypList from "./PypList";

export default function SearchScreen({pyp, filteredCourse}) {
    if (filteredCourse === "") {
        return (
            <h1>
                {pyp.length > 0 ? <PypList pyp={pyp} /> : <EmptyList />}
            </h1>
        );
    } else {
        const filteredPyp = pyp.filter(
            (pyp) => 
            filteredCourse.toLowerCase() === pyp.courseCode
                                                .slice(0, filteredCourse.length)
                                                .toLowerCase());
        return (
            <h1>
                {filteredPyp.length > 0 
                ? <PypList pyp={filteredPyp} /> 
                : <EmptyList />}
            </h1>
        );
    }
}