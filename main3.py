import cv2
import os

# Step 1: Extract frames
video_path = "sample-1.mp4"
frames_folder = "frames"
os.makedirs(frames_folder, exist_ok=True)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    raise IOError(f"Could not open video file: {video_path}")

frame_count = 0
while True:
    success, frame = cap.read()
    if not success:
        break
    cv2.imwrite(f"{frames_folder}/frame_{frame_count:04d}.png", frame)
    frame_count += 1

cap.release()
print(f"Extracted {frame_count} frames.")

# Step 2: Load mask
mask = cv2.imread("mask.png", 0)
if mask is None:
    raise FileNotFoundError("mask.png not found.")

# Step 3: Inpaint frames
output_folder = "cleaned"
os.makedirs(output_folder, exist_ok=True)

for i in range(frame_count):
    frame_path = f"{frames_folder}/frame_{i:04d}.png"
    frame = cv2.imread(frame_path)
    if frame is None:
        print(f"Skipping missing frame: {frame_path}")
        continue
    inpainted = cv2.inpaint(frame, mask, 3, cv2.INPAINT_TELEA)
    cv2.imwrite(f"{output_folder}/frame_{i:04d}.png", inpainted)
    print(f"Saved cleaned frame: {output_folder}/frame_{i:04d}.png")
