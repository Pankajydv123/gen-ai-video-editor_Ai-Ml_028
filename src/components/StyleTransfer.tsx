
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Loader2, ArrowLeft, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function StyleTransfer() {
  const [contentImage, setContentImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const styleInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleContentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setContentImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const handleStyleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStyleImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  const processImages = async () => {
    if (!contentImage || !styleImage) {
      toast.error('Please upload both content and style images');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate style transfer
      const contentImg = new Image();
      const styleImg = new Image();
      
      contentImg.onload = () => {
        styleImg.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = contentImg.width;
          canvas.height = contentImg.height;
          
          // Draw content image
          ctx.drawImage(contentImg, 0, 0);
          
          // Apply style transfer simulation
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Create a temporary canvas for style image
          const styleCanvas = document.createElement('canvas');
          const styleCtx = styleCanvas.getContext('2d');
          if (!styleCtx) return;
          
          styleCanvas.width = styleImg.width;
          styleCanvas.height = styleImg.height;
          styleCtx.drawImage(styleImg, 0, 0);
          
          const styleData = styleCtx.getImageData(0, 0, styleImg.width, styleImg.height);
          
          // Simple style transfer simulation by blending colors
          for (let i = 0; i < data.length; i += 4) {
            const x = Math.floor((i / 4) % canvas.width);
            const y = Math.floor((i / 4) / canvas.width);
            
            // Map to style image coordinates
            const styleX = Math.floor((x / canvas.width) * styleImg.width);
            const styleY = Math.floor((y / canvas.height) * styleImg.height);
            const styleIndex = (styleY * styleImg.width + styleX) * 4;
            
            if (styleIndex < styleData.data.length) {
              // Blend content and style
              data[i] = Math.floor(data[i] * 0.7 + styleData.data[styleIndex] * 0.3);
              data[i + 1] = Math.floor(data[i + 1] * 0.7 + styleData.data[styleIndex + 1] * 0.3);
              data[i + 2] = Math.floor(data[i + 2] * 0.7 + styleData.data[styleIndex + 2] * 0.3);
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          setProcessedImage(canvas.toDataURL('image/png'));
          setIsProcessing(false);
          toast.success('Style transfer completed successfully!');
        };
        styleImg.src = styleImage;
      };
      contentImg.src = contentImage;
    } catch (error) {
      console.error('Error processing images:', error);
      toast.error('Failed to process images');
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = 'style-transfer.png';
    link.href = processedImage;
    link.click();
    toast.success('Image downloaded successfully!');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Artistic Style Transfer</h1>
        <p className="text-gray-600">Apply artistic styles to your images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Image</CardTitle>
            <CardDescription>
              The image you want to stylize
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => contentInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Upload size={16} className="mr-2" />
                Upload Content
              </Button>
              <input
                ref={contentInputRef}
                type="file"
                accept="image/*"
                onChange={handleContentUpload}
                className="hidden"
              />
              
              {contentImage && (
                <img
                  src={contentImage}
                  alt="Content"
                  className="w-full h-48 object-cover border rounded-lg"
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Style Image</CardTitle>
            <CardDescription>
              The artistic style to apply
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                onClick={() => styleInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                <Palette size={16} className="mr-2" />
                Upload Style
              </Button>
              <input
                ref={styleInputRef}
                type="file"
                accept="image/*"
                onChange={handleStyleUpload}
                className="hidden"
              />
              
              {styleImage && (
                <img
                  src={styleImage}
                  alt="Style"
                  className="w-full h-48 object-cover border rounded-lg"
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>
              Your stylized image
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processedImage ? (
              <div className="space-y-4">
                <img
                  src={processedImage}
                  alt="Processed"
                  className="w-full h-48 object-cover border rounded-lg"
                />
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
                Upload both images to see the result
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Button
          onClick={processImages}
          disabled={isProcessing || !contentImage || !styleImage}
          size="lg"
        >
          {isProcessing ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Processing Style Transfer...
            </>
          ) : (
            'Apply Style Transfer'
          )}
        </Button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
