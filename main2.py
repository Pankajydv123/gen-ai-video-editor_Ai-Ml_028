import cv2
import os

frames_folder = "frames"
output_folder = "cleaned"
os.makedirs(output_folder, exist_ok=True)

# Load mask
mask = cv2.imread("mask.png", 0)
if mask is None:
    raise FileNotFoundError("mask.png not found")
print(f"Mask shape: {mask.shape}")

# List frames
frame_files = [f for f in sorted(os.listdir(frames_folder)) if f.endswith(".png")]
print(f"Found {len(frame_files)} frames")

for i, frame_file in enumerate(frame_files):
    frame_path = os.path.join(frames_folder, frame_file)
    print(f"Processing frame {i+1}/{len(frame_files)}: {frame_path}")
    frame = cv2.imread(frame_path)
    if frame is None:
        print(f"Warning: Could not read frame {frame_path}")
        continue
    inpainted = cv2.inpaint(frame, mask, 3, cv2.INPAINT_TELEA)
    output_path = os.path.join(output_folder, frame_file)
    if cv2.imwrite(output_path, inpainted):
        print(f"Saved: {output_path}")
    else:
        print(f"Failed to save: {output_path}")
