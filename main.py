
from moviepy.editor import VideoFileClip
mp4_file =input("Enter the full path of your video file")
mp3_file = "audio.mp3"
video_clip = VideoFileClip(mp4_file)
audio_clip = video_clip.audio 
audio_clip.write_audiofile(mp3_file)
audio_clip.close()
video_clip.close()
print("Audio extraction successful!",mp3_file)
import whisper

model = whisper.load_model("tiny") 

result = model.transcribe(mp3_file)
print("Transcription:")
print(result["text"])
from bark import generate_audio, SAMPLE_RATE
import scipy.io.wavfile as wavfile

text_prompt = result

audio_array = generate_audio(text_prompt)
wavfile.write("bark_output.wav", SAMPLE_RATE, audio_array)
print("Voice generated and saved as bark_output.wav")
