import DropBox from "./Dropbox";

export default function UploadScreen({uploadPyp, handleUploadPyp, handleSetPyp}) {
    return (
    <form className="upload-form">
        <legend className="form-label">Course</legend>
        <input type="text" 
            placeholder="CourseCode" 
            value={uploadPyp.courseCode}
            onChange={handleUploadPyp}
            name="courseCode"
            className="upload-input"></input>
        <br />
        <legend className="form-label">Year</legend>
        <input type="text" 
            placeholder="yy / yy" 
            value={uploadPyp.pypYear}
            onChange={handleUploadPyp}
            name="pypYear"
            className="upload-input"></input>
        <br />
        <legend className="form-label">Semester</legend>
        <fieldset className="upload-sem">
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
        <legend className="form-label">Midterms / Finals</legend>
        <fieldset className="upload-sem">
            <label className="option-label">Midterms</label>
            <input 
                type="radio"
                name="midorFinals"
                value="Midterms"
                checked={uploadPyp.midorFinals === "Midterms"}
                onChange={handleUploadPyp} />
            <label className="option-label">Finals</label>
            <input 
                type="radio"
                name="midorFinals"
                value="Finals"
                checked={uploadPyp.midorFinals === "Finals"}
                onChange={handleUploadPyp} />
        </fieldset>
        <br />
        <legend className="form-label">Questions / Answers</legend>
        <fieldset className="upload-qna">
            <label className="option-label">Questions</label>
            <input 
                type="radio"
                name="type"
                value="Question"
                checked={uploadPyp.type === "Question"}
                onChange={handleUploadPyp} 
                />
            <label className="option-label">Answers</label>
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