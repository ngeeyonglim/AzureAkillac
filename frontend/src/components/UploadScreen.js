import DropBox from "./Dropbox";
import NavBar from "./NavBar";
import { useUpdatePypList } from "./PypListContext";

export default function UploadScreen() {
    const { handleSetPyp, handleUploadPyp, uploadPyp } = useUpdatePypList();
    return (
        <div>
            <NavBar />
            <form className="upload-form">
                <legend>Course</legend>
                <input type="text" 
                    placeholder="CourseCode" 
                    value={uploadPyp.courseCode}
                    onChange={handleUploadPyp}
                    name="courseCode"
                    className="upload-input"></input>
                <br />
                <legend>Year</legend>
                <input type="text" 
                    placeholder="yy yy" 
                    value={uploadPyp.pypYear}
                    onChange={handleUploadPyp}
                    name="pypYear"
                    className="upload-input"></input>
                <br />
                <legend>Semester</legend>
                <fieldset className="upload-fieldset">
                    <label className="option-label">Semester 1</label>
                    <input 
                        type="radio"
                        name="semester"
                        value="semester1"
                        checked={uploadPyp.semester === "semester1"}
                        onChange={handleUploadPyp} />
                    <label className="option-label">Semester 2</label>
                    <input 
                        type="radio"
                        name="semester"
                        value="semester2"
                        checked={uploadPyp.semester === "semester2"}
                        onChange={handleUploadPyp} />
                </fieldset>
                <br />
                <legend>Midterms / Finals</legend>
                <fieldset className="upload-fieldset">
                    <label className="option-label">Midterms</label>
                    <input 
                        type="radio"
                        name="midOrFinals"
                        value="Mid"
                        checked={uploadPyp.midOrFinals === "Mid"}
                        onChange={handleUploadPyp} />
                    <label className="option-label">Finals</label>
                    <input 
                        type="radio"
                        name="midOrFinals"
                        value="Fin"
                        checked={uploadPyp.midOrFinals === "Fin"}
                        onChange={handleUploadPyp} />
                </fieldset>
                <br />
                <legend>Questions / Answers</legend>
                <fieldset className="upload-fieldset">
                    <label className="option-label">Questions</label>
                    <input 
                        type="radio"
                        name="ansOrQuestions"
                        value= "Question"
                        checked={uploadPyp.ansOrQuestions === "Question"}
                        onChange={handleUploadPyp} />
                    <label className="option-label">Answers</label>
                    <input 
                        type="radio"
                        name="ansOrQuestions"
                        value= "Answer"
                        checked={uploadPyp.ansOrQuestions === "Answer"}
                        onChange={handleUploadPyp} />
                </fieldset>
                <br />
                <DropBox uploadPyp={uploadPyp} handleUploadPyp={handleUploadPyp}/>
                <button type="submit" 
                    onClick={handleSetPyp} 
                    className="upload-button">
                    Upload
                </button>
            </form>
        </div>
    )
}