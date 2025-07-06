import os
import tempfile
import subprocess
from PIL import Image
from rembg import remove

def process_frame(path):
    try:
        img = Image.open(path).convert("RGBA")

        # Resize while maintaining aspect ratio (optional)
        img.thumbnail((512, 512), Image.Resampling.LANCZOS)

        with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temp:
            img.save(temp.name)
            with open(temp.name, "rb") as f:
                input_data = f.read()

        output = remove(input_data)

        with open(path, "wb") as f:
            f.write(output)

        os.remove(temp.name)

    except Exception as e:
        print(f"Frame processing failed: {e}")

def remove_background_from_video(input_path, output_path):
    with tempfile.TemporaryDirectory() as temp_dir:
        frame_pattern = os.path.join(temp_dir, "frame_%05d.png")

        subprocess.run([
            "ffmpeg", "-y", "-i", input_path, "-vf", "fps=10", frame_pattern
        ], check=True)

        frame_files = sorted([
            os.path.join(temp_dir, f)
            for f in os.listdir(temp_dir) if f.endswith('.png')
        ])

        for frame_path in frame_files:
            process_frame(frame_path)

        subprocess.run([
            "ffmpeg", "-y", "-framerate", "10", "-i",
            os.path.join(temp_dir, "frame_%05d.png"),
            "-c:v", "libx264", "-pix_fmt", "yuv420p", output_path
        ], check=True)
