import cv2
from rembg import remove
import numpy as np

def remove_background_from_video(input_path, output_path):
    cap = cv2.VideoCapture(input_path)
    width  = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps    = cap.get(cv2.CAP_PROP_FPS)

    out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        try:
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            _, buffer = cv2.imencode(".png", rgb)
            result = remove(buffer.tobytes())

            nparr = np.frombuffer(result, np.uint8)
            img_np = cv2.imdecode(nparr, cv2.IMREAD_UNCHANGED)

            # If alpha channel exists, drop it
            if img_np.shape[2] == 4:
                bgr = cv2.cvtColor(img_np, cv2.COLOR_BGRA2BGR)
            else:
                bgr = img_np

            out.write(bgr)

            # Free memory
            del frame, rgb, buffer, result, nparr, img_np, bgr
        except Exception as e:
            print(f"Frame processing failed: {e}")
            continue

    cap.release()
    out.release()
    cv2.destroyAllWindows()
