import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

export default function DropBox({ uploadPyp }) {
  const [file, setFile] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    type: "file/*",
    multiple: false,
    onDrop: acceptedFiles => { 
      setFile(acceptedFiles);
    }
  });
  
  // update file attribute of uploadPyp each time file is dropped
  useEffect(() => {
    uploadPyp.file = file;
    // eslint-disable-next-line
  }, [file]);

  return (
    <div {...getRootProps()} className="dropbox">
      <input {...getInputProps()} />
      <p className="dropbox-text">Drag files here or click to select files</p>
    </div>
  );
}