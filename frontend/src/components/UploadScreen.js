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
                <div className="upload-input">
                <input type="text" 
                    placeholder="yy" 
                    value={uploadPyp.pypYear1}
                    onChange={handleUploadPyp}
                    name="pypYear1"
                    className="upload-year"></input>
                <p>/</p>
                <input type="text" 
                    placeholder="yy" 
                    value={uploadPyp.pypYear2}
                    onChange={handleUploadPyp}
                    name="pypYear2"
                    className="upload-year"></input>
                </div>
                <br />
                <legend>Semester</legend>
                <fieldset className="upload-fieldset">
                    <label className="option-label">Semester 1</label>
                    <input 
                        type="radio"
                        name="semester"
                        value="Sem1"
                        checked={uploadPyp.semester === "Sem1"}
                        onChange={handleUploadPyp} />
                    <label className="option-label">Semester 2</label>
                    <input 
                        type="radio"
                        name="semester"
                        value="Sem2"
                        checked={uploadPyp.semester === "Sem2"}
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
                        value= "Questions"
                        checked={uploadPyp.ansOrQuestions === "Questions"}
                        onChange={handleUploadPyp} />
                    <label className="option-label">Answers</label>
                    <input 
                        type="radio"
                        name="ansOrQuestions"
                        value= "Answers"
                        checked={uploadPyp.ansOrQuestions === "Answers"}
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