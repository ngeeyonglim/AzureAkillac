export default function UploadScreen({uploadPyp, handleUploadPyp, handleSetPyp}) {
    return (
    <form className="upload-form">
        <label>
            Course
        <input type="text" 
            placeholder="CourseCode" 
            value={uploadPyp.courseCode}
            onChange={handleUploadPyp}
            name="courseCode"
            className="upload-text"></input>
        </label>
        <label>
            File
        <input type="text" 
            placeholder="File to upload" 
            value={uploadPyp.pypName}
            onChange={handleUploadPyp}
            name="pypName"
            className="upload-text"></input>
        </label>
        <button type="submit" 
            onClick={handleSetPyp} 
            className="upload-button">
            Upload
        </button>
    </form>
    )
}