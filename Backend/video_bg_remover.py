from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uuid
import os
import requests
import shutil
from process_video import remove_background_from_video
import b2sdk.v2 as b2

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

# Local storage
UPLOAD_DIR = "temp_uploads"
OUTPUT_DIR = "temp_outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Backblaze B2 Setup
info = b2.InMemoryAccountInfo()
b2_api = b2.B2Api(info)
b2_api.authorize_account("production", os.environ["B2_KEY_ID"], os.environ["B2_SECRET"])
bucket = b2_api.get_bucket_by_name(os.environ["B2_BUCKET"])

@app.get("/")
def home():
    return {"message": "Backend is live"}

@app.post("/upload-video")
async def upload_video(video: UploadFile = File(...)):
    try:
        file_id = str(uuid.uuid4())
        local_path = os.path.join(UPLOAD_DIR, f"{file_id}_{video.filename}")

        with open(local_path, "wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        # Upload to Backblaze
        b2_file_name = f"{file_id}_{video.filename}"
        with open(local_path, "rb") as f:
            bucket.upload_bytes(f.read(), b2_file_name)

        video_url = f"https://f002.backblazeb2.com/file/{os.environ['B2_BUCKET']}/{b2_file_name}"
        return {"video_url": video_url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@app.post("/remove-background-from-url")
async def remove_bg_url(request: Request):
    try:
        data = await request.json()
        video_url = data.get("video_url")

        if not video_url:
            raise HTTPException(status_code=400, detail="Video URL is missing")

        file_id = str(uuid.uuid4())
        input_path = os.path.join(UPLOAD_DIR, f"{file_id}.mp4")
        output_path = os.path.join(OUTPUT_DIR, f"{file_id}_output.mp4")

        # Download from Backblaze
        r = requests.get(video_url, stream=True)
        if r.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to download video")

        with open(input_path, "wb") as f:
            shutil.copyfileobj(r.raw, f)

        # Background removal
        remove_background_from_video(input_path, output_path)

        return StreamingResponse(
            open(output_path, "rb"),
            media_type="video/mp4",
            headers={"Content-Disposition": f"attachment; filename=bg_removed_{file_id}.mp4"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Background removal failed: {str(e)}")
