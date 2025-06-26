import cv2
import os
import numpy as np
from PIL import Image
from rembg import remove
import concurrent.futures
import tempfile

def process_frame(path):
    with open(path, "rb") as f:
        input_data = f.read()
    output = remove(input_data)
    with open(path, "wb") as f:
        f.write(output)

def remove_background_from_video(input_path, output_path):
    with tempfile.TemporaryDirectory() as temp_dir:
        frame_pattern = os.path.join(temp_dir, "frame_%05d.png")
        
        # Extract frames
        os.system(f'ffmpeg -y -i "{input_path}" "{frame_pattern}"')

        # Get list of frame paths
        frame_files = sorted([os.path.join(temp_dir, f) for f in os.listdir(temp_dir) if f.endswith('.png')])

        # Process frames in parallel
        with concurrent.futures.ThreadPoolExecutor() as executor:
            executor.map(process_frame, frame_files)

        # Reassemble video
        os.system(
            f'ffmpeg -y -framerate 25 -i "{os.path.join(temp_dir, "frame_%05d.png")}" '
            f'-c:v libx264 -pix_fmt yuv420p "{output_path}"'
        )
