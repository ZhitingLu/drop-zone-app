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
          <li key={file.name}>
            {file.type.includes('image') && (
              <img src={URL.createObjectURL(file)} alt={file.name} />
            )}
            {file.type.includes('video') && (
              <video controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
              </video>
            )}
            {!file.type.includes('image') && !file.type.includes('video') && (
              <span>{file.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropZone;
