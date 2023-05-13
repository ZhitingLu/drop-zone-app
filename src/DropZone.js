import React from 'react';
import { useDropzone } from 'react-dropzone';

const DropZone = () => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone();

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag and drop files here, or click to select files</p>
      <ul>
        {acceptedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DropZone;
