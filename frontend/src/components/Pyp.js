import NavBar from "./NavBar";

export default function Pyp({ pyp }) {

    return (
        <div>
            <NavBar />
            <h1>{pyp.ansOrQuestions}</h1>
            <a href={pyp.file} target="blank">View</a>
        </div>
    );
}