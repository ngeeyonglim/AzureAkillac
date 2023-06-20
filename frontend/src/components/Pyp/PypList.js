import { useCourseList } from "./PypListContext";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import PypCard from "./PypCard";
import LoadingScreen from "../LoadingScreen";

export default function PypList({ courseCode }) {
    const { fetchPypNames } = useCourseList();
    const [pyps, setPyps] = useState([]);

    // fetch the PYPs for the course code
    useEffect(() => {
        fetchPypNames(courseCode, setPyps);
    }, [courseCode, fetchPypNames]);

    return (
        <div>
        {pyps.length === 0 ?
        <LoadingScreen />
        :
        <>
        <NavBar />
        <div className="list">
            <h1>{ courseCode }</h1>
            <table>
                <thead>
                    <tr>
                        <th>{pyps.length} Papers Found</th>
                    </tr>
                </thead>
                <tbody>
                    {pyps && pyps.map((pypName, i) =>  {
                        return (
                            <tr key={i}>
                            <PypCard pypName={pypName} />
                        </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </>
        }
        </div>
    );
}