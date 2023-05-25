import EmptyList from "./EmptyList";
import PypList from "./PypList";

export default function SearchScreen({pyp, courseCode}) {
    const filteredPyp = pyp.filter((pyp) => 
        courseCode.toLowerCase() === pyp.courseCode
                                            .slice(0, courseCode.length)
                                            .toLowerCase());
    return (
        <div>
            {filteredPyp.length > 0 
            ? <PypList pyp={filteredPyp} /> 
            : <EmptyList />}
        </div>
    );
}