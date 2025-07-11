from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uuid
import os
import requests
import shutil
from process_video import remove_background_from_video

app = FastAPI()

# CORS Setup
origins = [
    "http://localhost:3000",
    "https://pankajydv123.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_DIR = "temp_uploads"
OUTPUT_DIR = "temp_outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
def home():
    return {"message": "Backend is live"}

@app.post("/remove-background-from-url")
async def remove_bg_url(request: Request):
    try:
        data = await request.json()
        video_url = data.get("video_url")

        if not video_url:
            raise HTTPException(status_code=400, detail="Video URL is missing")

        # Generate unique filenames
        file_id = str(uuid.uuid4())
        input_path = os.path.join(UPLOAD_DIR, f"{file_id}.mp4")
        output_path = os.path.join(OUTPUT_DIR, f"{file_id}_output.mp4")

        # Download the video
        response = requests.get(video_url, stream=True)
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to download video")

        with open(input_path, "wb") as f:
            shutil.copyfileobj(response.raw, f)

        # Process the video
        remove_background_from_video(input_path, output_path)

        # Return the processed file
        return StreamingResponse(
            open(output_path, "rb"),
            media_type="video/mp4",
            headers={"Content-Disposition": f"attachment; filename=bg_removed_{file_id}.mp4"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Background removal failed: {str(e)}")
