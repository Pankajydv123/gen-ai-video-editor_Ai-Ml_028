import cv2
import os
import numpy as np
from PIL import Image
from rembg import remove
import tempfile
import gc
import subprocess

def process_frame(path):
    with open(path, "rb") as f:
        input_data = f.read()
    output = remove(input_data)
    with open(path, "wb") as f:
        f.write(output)
    # Force memory release
    del input_data
    del output
    gc.collect()

def remove_background_from_video(input_path, output_path):
    with tempfile.TemporaryDirectory() as temp_dir:
        frame_pattern = os.path.join(temp_dir, "frame_%05d.png")

        # Step 1: Extract frames (better subprocess version)
        extract_cmd = [
            "ffmpeg", "-y", "-i", input_path, frame_pattern
        ]
        subprocess.run(extract_cmd, check=True)

        # Step 2: Process frames sequentially to save RAM
        frame_files = sorted([os.path.join(temp_dir, f) for f in os.listdir(temp_dir) if f.endswith('.png')])
        for path in frame_files:
            process_frame(path)

        # Step 3: Reassemble video
        reencode_cmd = [
            "ffmpeg", "-y", "-framerate", "25", "-i", os.path.join(temp_dir, "frame_%05d.png"),
            "-c:v", "libx264", "-pix_fmt", "yuv420p", output_path
        ]
        subprocess.run(reencode_cmd, check=True)
