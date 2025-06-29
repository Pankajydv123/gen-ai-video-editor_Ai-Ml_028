import cv2
from rembg import remove
import numpy as np
import os

def process_video(input_path, output_path):
    cap = cv2.VideoCapture(input_path)
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = cap.get(cv2.CAP_PROP_FPS)

    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height), True)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Convert to PNG and apply rembg
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        _, buffer = cv2.imencode(".png", rgb_frame)
        removed = remove(buffer.tobytes())

        nparr = np.frombuffer(removed, np.uint8)
        img_np = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)

        # Resize if needed and handle alpha channel
        if img_np.shape[2] == 4:
            bgr = cv2.cvtColor(img_np, cv2.COLOR_BGRA2BGR)
        else:
            bgr = img_np

        out.write(bgr)
        del frame, rgb_frame, buffer, removed, img_np, bgr  # free memory

    cap.release()
    out.release()
    cv2.destroyAllWindows()

process_video("input.mp4", "output.mp4")
