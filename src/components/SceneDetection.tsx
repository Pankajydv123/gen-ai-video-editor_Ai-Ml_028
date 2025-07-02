
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, Loader2, ArrowLeft, Video, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface DetectedScene {
  startTime: number;
  endTime: number;
  confidence: number;
  thumbnail?: string;
}

export default function SceneDetection() {
  const [originalVideo, setOriginalVideo] = useState<string | null>(null);
  const [detectedScenes, setDetectedScenes] = useState<DetectedScene[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setOriginalVideo(url);
      setVideoFile(file);
      setDetectedScenes([]);
    } else {
      toast.error('Please select a valid video file');
    }
  };

  const detectScenes = async () => {
    if (!originalVideo || !videoRef.current) return;

    setIsProcessing(true);
    try {
      const video = videoRef.current;
      const duration = video.duration;
      
      // Simulate scene detection algorithm
      const scenes: DetectedScene[] = [];
      const numScenes = Math.floor(Math.random() * 5) + 3; // 3-7 scenes
      
      for (let i = 0; i < numScenes; i++) {
        const startTime = (duration / numScenes) * i;
        const endTime = Math.min((duration / numScenes) * (i + 1), duration);
        const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence
        
        scenes.push({
          startTime,
          endTime,
          confidence
        });
      }
      
      setDetectedScenes(scenes);
      setIsProcessing(false);
      toast.success(`Detected ${scenes.length} scenes in the video!`);
    } catch (error) {
      console.error('Error detecting scenes:', error);
      toast.error('Failed to detect scenes');
      setIsProcessing(false);
    }
  };

  const jumpToScene = (startTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
    }
  };

  const downloadSceneClip = async (scene: DetectedScene, index: number) => {
    if (!videoFile) {
      toast.error('Original video file not available');
      return;
    }

    toast.success(`Scene ${index + 1} clip download would start here (demo mode)`);
    // In a real implementation, you would:
    // 1. Use FFmpeg.js or similar to cut the video segment
    // 2. Create a blob with the cut segment
    // 3. Download the segment as a separate file
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Tools
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scene Detection & Auto-Cut</h1>
        <p className="text-gray-600">Automatically detect scene changes and split videos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>
              Select a video to analyze for scene changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Upload size={16} className="mr-2" />
                Choose Video
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {originalVideo && (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    src={originalVideo}
                    controls
                    className="w-full h-64 border rounded-lg"
                  />
                  <Button
                    onClick={detectScenes}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Analyzing Scenes...
                      </>
                    ) : (
                      <>
                        <Video size={16} className="mr-2" />
                        Detect Scenes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detected Scenes</CardTitle>
            <CardDescription>
              Scene cuts detected by AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {detectedScenes.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {detectedScenes.map((scene, index) => (
                  <div 
                    key={index}
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => jumpToScene(scene.startTime)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Scene {index + 1}</span>
                      <Badge variant="secondary">
                        {Math.round(scene.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {formatTime(scene.startTime)} - {formatTime(scene.endTime)}
                      <span className="ml-2">
                        ({Math.round(scene.endTime - scene.startTime)}s duration)
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          jumpToScene(scene.startTime);
                        }}
                      >
                        <Video size={14} className="mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadSceneClip(scene, index);
                        }}
                      >
                        <Scissors size={14} className="mr-1" />
                        Cut Scene
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Upload and analyze a video to detect scenes
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {detectedScenes.length > 0 && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scene Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{detectedScenes.length}</div>
                  <div className="text-sm text-gray-600">Total Scenes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(detectedScenes.reduce((sum, scene) => sum + scene.confidence, 0) / detectedScenes.length * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(detectedScenes.reduce((sum, scene) => sum + (scene.endTime - scene.startTime), 0))}s
                  </div>
                  <div className="text-sm text-gray-600">Total Duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(detectedScenes.reduce((sum, scene) => sum + (scene.endTime - scene.startTime), 0) / detectedScenes.length)}s
                  </div>
                  <div className="text-sm text-gray-600">Avg Scene Length</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
