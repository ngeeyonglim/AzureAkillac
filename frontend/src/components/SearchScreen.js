import EmptyList from "./EmptyList";
import PypList from "./PypList";

export default function SearchScreen({pyp}) {
    return (
        <h1>
            {pyp.length > 0 
            ? (<PypList pyp={pyp} />) 
            : (<EmptyList />)}
        </h1>
    );
}