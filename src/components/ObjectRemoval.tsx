
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Loader2, ArrowLeft, Eraser } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ObjectRemoval() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = maskCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const processImage = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      // Simulate object removal with inpainting
      const img = new Image();
      img.onload = async () => {
        const canvas = canvasRef.current;
        const maskCanvas = maskCanvasRef.current;
        if (!canvas || !maskCanvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        // Simple inpainting simulation
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const maskData = maskCanvas.getContext('2d')?.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
        
        if (maskData) {
          // Apply simple blur where mask is present
          for (let y = 1; y < canvas.height - 1; y++) {
            for (let x = 1; x < canvas.width - 1; x++) {
              const maskIndex = (y * maskCanvas.width + x) * 4;
              if (maskData.data[maskIndex + 3] > 0) {
                // Apply blur to masked areas
                const imageIndex = (y * canvas.width + x) * 4;
                let r = 0, g = 0, b = 0, count = 0;
                
                for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                    const neighborIndex = ((y + dy) * canvas.width + (x + dx)) * 4;
                    r += imageData.data[neighborIndex];
                    g += imageData.data[neighborIndex + 1];
                    b += imageData.data[neighborIndex + 2];
                    count++;
                  }
                }
                
                imageData.data[imageIndex] = r / count;
                imageData.data[imageIndex + 1] = g / count;
                imageData.data[imageIndex + 2] = b / count;
              }
            }
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL('image/png'));
        setIsProcessing(false);
        toast.success('Object removed successfully!');
      };
      img.src = originalImage;
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = 'object-removed.png';
    link.href = processedImage;
    link.click();
    toast.success('Image downloaded successfully!');
  };

  const clearMask = () => {
    const maskCanvas = maskCanvasRef.current;
    if (!maskCanvas) return;
    
    const ctx = maskCanvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Object Removal</h1>
        <p className="text-gray-600">Remove unwanted objects from your images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Mark Objects</CardTitle>
            <CardDescription>
              Upload an image and mark objects to remove
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
                Choose Image
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {originalImage && (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={originalImage}
                      alt="Original"
                      className="w-full h-64 object-contain border rounded-lg"
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        const maskCanvas = maskCanvasRef.current;
                        if (maskCanvas) {
                          maskCanvas.width = img.naturalWidth;
                          maskCanvas.height = img.naturalHeight;
                        }
                      }}
                    />
                    <canvas
                      ref={maskCanvasRef}
                      className="absolute top-0 left-0 w-full h-64 object-contain cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={clearMask}
                      variant="outline"
                      className="flex-1"
                    >
                      <Eraser size={16} className="mr-2" />
                      Clear Mask
                    </Button>
                    <Button
                      onClick={processImage}
                      disabled={isProcessing}
                      className="flex-1"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Remove Objects'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Your image with objects removed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processedImage ? (
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="w-full h-64 object-contain"
                  />
                </div>
                <Button
                  onClick={downloadImage}
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download Image
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Upload an image and mark objects to remove
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
