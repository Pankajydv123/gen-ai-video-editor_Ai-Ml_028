from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import os
import shutil
import uuid
from process_video import remove_background_from_video

app = FastAPI()

# CORS for all origins (update with your frontend domain for security)
origins = [
    "https://pankajydv123.github.io",  # ✅ Exact domain of your frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,     # ✅ Important: no "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directories
UPLOAD_DIR = "temp_uploads"
OUTPUT_DIR = "temp_outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"status": "Backend running successfully"}

@app.post("/remove-background")
async def remove_bg(video: UploadFile = File(...)):
    try:
        # Generate unique filenames
        file_id = str(uuid.uuid4())
        input_path = os.path.join(UPLOAD_DIR, f"{file_id}.mp4")
        output_path = os.path.join(OUTPUT_DIR, f"{file_id}_output.mp4")

        # Save uploaded video
        with open(input_path, "wb") as f:
            shutil.copyfileobj(video.file, f)

        # Process video
        remove_background_from_video(input_path, output_path)

        # Stream the result back
        return StreamingResponse(
            open(output_path, "rb"),
            media_type="video/mp4",
            headers={
                "Content-Disposition": f"attachment; filename=bg_removed_{file_id}.mp4"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Background removal failed: {str(e)}")

    finally:
        # Optional cleanup (you can enable this in production)
        if os.path.exists(input_path):
            os.remove(input_path)
        # Don't delete output if you're serving it directly from file
