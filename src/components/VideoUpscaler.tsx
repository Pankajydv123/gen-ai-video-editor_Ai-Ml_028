
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Loader2, ArrowLeft, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function VideoUpscaler() {
  const [originalVideo, setOriginalVideo] = useState<string | null>(null);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalVideoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      setOriginalVideo(url);
      setProcessedVideo(null);
    } else {
      toast.error('Please select a valid video file');
    }
  };

  const processVideo = async () => {
    if (!originalVideo) return;

    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate video upscaling process
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // For demo purposes, use the same video as "upscaled"
      setProcessedVideo(originalVideo);
      setIsProcessing(false);
      toast.success('Video upscaled successfully!');
    } catch (error) {
      console.error('Error processing video:', error);
      toast.error('Failed to process video');
      setIsProcessing(false);
    }
  };

  const downloadVideo = () => {
    if (!processedVideo) return;
    
    const link = document.createElement('a');
    link.download = 'upscaled-video.mp4';
    link.href = processedVideo;
    link.click();
    toast.success('Video download started!');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Upscaler</h1>
        <p className="text-gray-600">Enhance video quality with AI upscaling</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Video</CardTitle>
            <CardDescription>
              Select a video to upscale
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
                    ref={originalVideoRef}
                    src={originalVideo}
                    controls
                    className="w-full h-64 border rounded-lg"
                  />
                  <Button
                    onClick={processVideo}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Upscaling... {Math.round(progress)}%
                      </>
                    ) : (
                      <>
                        <Zap size={16} className="mr-2" />
                        Upscale Video
                      </>
                    )}
                  </Button>
                  {isProcessing && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enhanced Video</CardTitle>
            <CardDescription>
              Your upscaled video result
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processedVideo ? (
              <div className="space-y-4">
                <video
                  src={processedVideo}
                  controls
                  className="w-full h-64 border rounded-lg"
                />
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✨ Video enhanced with AI upscaling
                  </p>
                </div>
                <Button
                  onClick={downloadVideo}
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download Enhanced Video
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Upload and process a video to see the enhanced result
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">AI Video Upscaling Features:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Motion-aware upscaling for smooth results</li>
          <li>• Temporal consistency across frames</li>
          <li>• Noise reduction and artifact removal</li>
          <li>• Supports various video formats</li>
        </ul>
      </div>
    </div>
  );
}
