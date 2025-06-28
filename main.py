import cv2
import os

video_path = "sample-1.mp4"  # ✅ Your actual video file name
frames_folder = "frames"

# Step 1: Create output folder
if not os.path.exists(frames_folder):
    os.makedirs(frames_folder)
    print(f"📁 Created folder: {frames_folder}")
else:
    print(f"📁 Folder already exists: {frames_folder}")

# Step 2: Load video
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    raise IOError(f"❌ ERROR: Could not open video file: {video_path}")

# Step 3: Read and save frames
frame_count = 0
while True:
    success, frame = cap.read()
    if not success:
        break

    frame_filename = os.path.join(frames_folder, f"frame_{frame_count:04d}.png")
    cv2.imwrite(frame_filename, frame)
    print(f"✅ Saved: {frame_filename}")
    frame_count += 1

cap.release()
print(f"\n🎉 Done! Extracted {frame_count} frames to the '{frames_folder}' folder.")

mask = cv2.imread("mask.png", 0)
if mask is None:
    raise FileNotFoundError("❌ 'mask.png' not found or can't be loaded. Make sure it is in the same folder as main.py")
else:
    print(f"✅ Mask loaded successfully with shape {mask.shape}")



# Load the mask (grayscale)
mask = cv2.imread("mask.png", 0)
if mask is None:
    raise FileNotFoundError("❌ 'mask.png' not found. Make sure it is in the same folder as main.py.")

# Create output folder
output_folder = "cleaned"
os.makedirs(output_folder, exist_ok=True)

# Inpaint each frame
for i in range(frame_count):
    frame_path = f"frames/frame_{i:04d}.png"
    frame = cv2.imread(frame_path)

    if frame is None:
        print(f"⚠️ Skipping missing frame: {frame_path}")
        continue

    result = cv2.inpaint(frame, mask, 3, cv2.INPAINT_TELEA)
    cv2.imwrite(f"{output_folder}/frame_{i:04d}.png", result)
    print(f"✅ Cleaned: {output_folder}/frame_{i:04d}.png")

print("🎉 All frames cleaned and saved to 'cleaned/' folder.")

