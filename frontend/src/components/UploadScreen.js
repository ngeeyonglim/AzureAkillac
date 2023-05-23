export default function UploadScreen({uploadPyp, handleUploadPyp, handleSetPyp}) {
    return (
    <form className="upload-form">
        <input type="text" 
            placeholder="File to upload" 
            value={uploadPyp}
            onChange={handleUploadPyp}
            className="upload-text"></input>
        <button type="submit" 
            onClick={handleSetPyp} 
            className="upload-button">
            Upload
        </button>
    </form>
    )
}