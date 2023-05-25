import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

export default function DropBox({ uploadPyp}) {
  const [file, setFile] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => { 
      setFile(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  // update file attribute of uploadPyp each time file is dropped
  useEffect(() => {
    uploadPyp.file = file;
  }, [file]);

  return (
    <div {...getRootProps()} className="dropbox">
      <input {...getInputProps()} />
      <p className="dropbox-text">Drag files here or click to select files</p>
    </div>
  );
}