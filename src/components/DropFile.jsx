import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const DropFile = ({saveShow, setSaveShow, setCostPriceShow, file, setFile}) => {
  
   const onDrop = acceptedFiles => {
    // Обработка загруженных файлов
    if(acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setCostPriceShow(false)
      setSaveShow(true)
      return file
    }
    setSaveShow(false)
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      <p>Перетащите файлы сюда или кликните, чтобы выбрать</p>
    </div>
  );
};

export default DropFile;