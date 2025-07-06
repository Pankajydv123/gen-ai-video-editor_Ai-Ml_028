import React, { useRef, useState } from 'react';
import './BG.css';
import axios from 'axios';

export default function VideoEditor() {
  const inputRef = useRef();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [outputVideo, setOutputVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setOutputVideo(null);
    }
  };

  const handleRemoveBackground = async () => {
    if (!videoFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await axios.post("https://gen-ai-video-editor-ai-ml-028.onrender.com//remove-background", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
        validateStatus: () => true,
      });

      if (res.status !== 200) {
        const errorText = await res.data.text();
        let errorMsg;
        try {
          const json = JSON.parse(errorText);
          errorMsg = json.detail || "Unknown error";
        } catch {
          errorMsg = errorText || "Server returned an unknown error.";
        }
        throw new Error(errorMsg);
      }

      const blob = new Blob([res.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(blob);
      setOutputVideo(videoUrl);
    } catch (err) {
      console.error("❌ Background removal failed:", err);
      alert("Background removal failed:\n" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="BG">
      <div className="SideBar">
        <ul>
          <li onClick={() => inputRef.current.click()}>Upload</li>
          <li onClick={handleRemoveBackground}>Remove BG</li>
        </ul>
      </div>

      <div className="BodyBar">
        <div className="UploadBox" onClick={() => inputRef.current.click()}>
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleUpload}
          />
          {videoPreview ? (
            <video src={videoPreview} controls />
          ) : (
            <p>Click to upload a video</p>
          )}
        </div>

        {loading && <p style={{ color: "white" }}>Processing video...</p>}

        {outputVideo && (
          <div className="OutputBox">
            <h4>Background Removed:</h4>
            <video src={outputVideo} controls />
            <a href={outputVideo} download="bg_removed.mp4">
              <button>Download Video</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
