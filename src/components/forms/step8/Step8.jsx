import React, { useState } from "react";
import "./step8.scss";

export default function Step8({ nextStep, prevStep }) {
  const [externalPhotos, setExternalPhotos] = useState([]);
  const [floorPlans, setFloorPlans] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const handleFileChange = (e, setter) => {
    const newFiles = Array.from(e.target.files);
    // Optional: Validate file types and sizes here
    setter((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDrop = (e, setter) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    // Optional: Validate file types and sizes here
    setter((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeFile = (fileToRemove, setter) => {
    setter((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  return (
    <div className="step8">
      <h2 className="merriweather-light">Załaduj zdjęcia</h2>

      <div className="fileUploaders">
        {/* External Photos */}
        <div
          className="fileUploader"
          onDrop={(e) => handleDrop(e, setExternalPhotos)}
          onDragOver={handleDragOver}
        >
          <label className="custom-file-upload lato-regular">
            <input
              type="file"
              multiple
              accept="image/*" // Restrict to image files
              onChange={(e) => handleFileChange(e, setExternalPhotos)}
            />
            {/* <span>Zdjęcia budynku z zewnątrz</span> */}
          </label>

          <div className="file-preview">
            {externalPhotos.map((file, index) => (
              <div key={index} className="file-item">
                <p className="lato-regular">{file.name}</p>
                <button onClick={() => removeFile(file, setExternalPhotos)}>x</button>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plans */}
        <div
          className="fileUploader"
          onDrop={(e) => handleDrop(e, setFloorPlans)}
          onDragOver={handleDragOver}
        >
          <label className="custom-file-upload lato-regular">
            <input
              type="file"
              multiple
              accept="image/*" // Restrict to image files
              onChange={(e) => handleFileChange(e, setFloorPlans)}
            />
            {/* <span>Rzuty nieruchomości</span> */}
          </label>

          <div className="file-preview">
            {floorPlans.map((file, index) => (
              <div key={index} className="file-item">
                <p className="lato-regular">{file.name}</p>
                <button onClick={() => removeFile(file, setFloorPlans)}>x</button>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div
          className="fileUploader"
          onDrop={(e) => handleDrop(e, setCertificates)}
          onDragOver={handleDragOver}
        >
          <label className="custom-file-upload lato-regular">
            <input
              type="file"
              multiple
              accept=".pdf,image/*" // Restrict to PDF and image files
              onChange={(e) => handleFileChange(e, setCertificates)}
            />
            {/* <span>Świadectwo budynku</span> */}
          </label>

          <div className="file-preview">
            {certificates.map((file, index) => (
              <div key={index} className="file-item">
                <p className="lato-regular">{file.name}</p>
                <button onClick={() => removeFile(file, setCertificates)}>x</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="back" onClick={prevStep}>
        &#x2190;
      </button>
      <button onClick={nextStep}>Zakończ</button>
    </div>
  );
}
