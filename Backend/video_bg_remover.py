from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import shutil
import uuid
from process_video import remove_background_from_video

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"]
)

UPLOAD_DIR = "temp_uploads"
OUTPUT_DIR = "temp_outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.post("/remove-background")
async def remove_bg(video: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{file_id}.mp4")
    output_path = os.path.join(OUTPUT_DIR, f"{file_id}_output.mp4")

    with open(input_path, "wb") as f:
        shutil.copyfileobj(video.file, f)

    # Process the video
    remove_background_from_video(input_path, output_path)

    return StreamingResponse(open(output_path, "rb"), media_type="video/mp4")
