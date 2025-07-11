from b2sdk.v2 import InMemoryAccountInfo, B2Api
import os

# Load your B2 credentials
B2_KEY_ID = os.getenv("B2_KEY_ID")       # e.g., '000...'
B2_APP_KEY = os.getenv("B2_APP_KEY")     # e.g., 'K000...'
BUCKET_NAME = "progen-ai-video-storage"

info = InMemoryAccountInfo()
b2_api = B2Api(info)
b2_api.authorize_account("production", B2_KEY_ID, B2_APP_KEY)
bucket = b2_api.get_bucket_by_name(BUCKET_NAME)

def download_video_from_b2(file_name: str, local_path: str):
    with open(local_path, "wb") as f:
        bucket.download_file_by_name(file_name).save_to(f)

def upload_video_to_b2(file_path: str, b2_file_name: str):
    bucket.upload_local_file(
        local_file=file_path,
        file_name=b2_file_name,
        file_infos={"src": "gen-ai"}
    )
