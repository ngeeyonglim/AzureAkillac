import DropBox from "./Dropbox";

export default function UploadScreen({uploadPyp, handleUploadPyp, handleSetPyp}) {
    return (
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
            placeholder="yy / yy" 
            value={uploadPyp.pypYear}
            onChange={handleUploadPyp}
            name="pypYear"
            className="upload-input"></input>
        <br />
        <legend>Semester</legend>
        <fieldset className="upload-sem">
            <label className="form-label">Semester 1</label>
            <input 
                type="radio"
                name="semester"
                value="Sem1"
                checked={uploadPyp.semester === "Sem1"}
                onChange={handleUploadPyp} />
            <label className="form-label">Semester 2</label>
            <input 
                type="radio"
                name="semester"
                value="Sem2"
                checked={uploadPyp.semester === "Sem2"}
                onChange={handleUploadPyp} />
        </fieldset>
        <br />
        <legend>Questions/Answers</legend>
        <fieldset className="upload-qna">
            <label className="form-label">Questions</label>
            <input 
                type="radio"
                name="type"
                value="Question"
                checked={uploadPyp.type === "Question"}
                onChange={handleUploadPyp} 
                />
            <label className="form-label">Answers</label>
            <input 
                type="radio"
                name="type"
                value="Answer"
                checked={uploadPyp.type === "Answer"}
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
    )
}