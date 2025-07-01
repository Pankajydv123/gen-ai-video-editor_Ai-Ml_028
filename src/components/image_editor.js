import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import getCroppedImg from "./cropImage"; // Helper to crop image (see below)
import "./ImageEditor.css";

function ImageEditor() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const cropped = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(cropped);
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels]);

  return (
    <div className="editor-container">
      <input type="file" onChange={handleImageUpload} />
      {image && (
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, zoom) => setZoom(zoom)}
          />
          <button onClick={showCroppedImage}>Crop Image</button>
        </div>
      )}
      {croppedImage && (
        <div className="cropped-result">
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
}

export default ImageEditor;

