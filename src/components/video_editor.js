import React, { useState } from 'react';
import './BG.css';

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = (index) => {
    const file = index.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className='BG'>
      <div className="SideBar">
        <ul>
          <li>Upload</li>
          <li>Cut</li>
          <li>Effects</li>
          <li>Audio</li>
          <li>Export</li>
        </ul>
      </div>

      <div className="BodyBar">
        <div className="UploadBox">
          {!videoFile ? (
            <>
              <label htmlFor="uploadInput" style={{ cursor: 'pointer' }}>
                <p>Click here or drag-and-drop to upload a video</p>
              </label>
              <input
                id="uploadInput"
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
            </>
          ) : (
            <video
              controls
              width="100%"
              height="100%"
              style={{ borderRadius: '1rem' }}
              src={videoFile}
            />
          )}
        </div>
      </div>
    </div>
  );
}