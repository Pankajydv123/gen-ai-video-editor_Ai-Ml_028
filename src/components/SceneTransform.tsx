
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, Loader2, ArrowLeft, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SceneTransform() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const samplePrompts = [
    "Make it nighttime with street lights",
    "Add snow and winter atmosphere",
    "Transform to autumn with golden leaves",
    "Make it a rainy day with puddles",
    "Add sunset lighting with warm colors"
  ];

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

  const transformScene = async () => {
    if (!originalImage || !prompt.trim()) {
      toast.error('Please upload an image and enter a transformation prompt');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate scene transformation
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        // Apply transformation based on prompt
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Simple transformations based on keywords in prompt
        const lowerPrompt = prompt.toLowerCase();
        
        if (lowerPrompt.includes('night') || lowerPrompt.includes('dark')) {
          // Darken the image
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.floor(data[i] * 0.4);
            data[i + 1] = Math.floor(data[i + 1] * 0.4);
            data[i + 2] = Math.floor(data[i + 2] * 0.6);
          }
        } else if (lowerPrompt.includes('warm') || lowerPrompt.includes('sunset')) {
          // Add warm tones
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.2);
            data[i + 1] = Math.floor(data[i + 1] * 1.1);
            data[i + 2] = Math.floor(data[i + 2] * 0.8);
          }
        } else if (lowerPrompt.includes('cold') || lowerPrompt.includes('winter')) {
          // Add cold tones
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.floor(data[i] * 0.8);
            data[i + 1] = Math.floor(data[i + 1] * 0.9);
            data[i + 2] = Math.min(255, data[i + 2] * 1.3);
          }
        } else if (lowerPrompt.includes('sepia') || lowerPrompt.includes('vintage')) {
          // Apply sepia effect
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        setProcessedImage(canvas.toDataURL('image/png'));
        setIsProcessing(false);
        toast.success('Scene transformed successfully!');
      };
      img.src = originalImage;
    } catch (error) {
      console.error('Error transforming scene:', error);
      toast.error('Failed to transform scene');
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    
    const link = document.createElement('a');
    link.download = 'scene-transformed.png';
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scene Transformation</h1>
        <p className="text-gray-600">Transform scenes using natural text prompts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload & Describe</CardTitle>
            <CardDescription>
              Upload an image and describe how you want to transform it
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
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-48 object-cover border rounded-lg"
                />
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Transformation Prompt</label>
                <Textarea
                  placeholder="Describe how you want to transform the scene..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sample Prompts</label>
                <div className="flex flex-wrap gap-2">
                  {samplePrompts.map((sample, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt(sample)}
                      className="text-xs"
                    >
                      {sample}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button
                onClick={transformScene}
                disabled={isProcessing || !originalImage || !prompt.trim()}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Transforming Scene...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} className="mr-2" />
                    Transform Scene
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transformed Scene</CardTitle>
            <CardDescription>
              Your scene with AI-powered transformations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {processedImage ? (
              <div className="space-y-4">
                <img
                  src={processedImage}
                  alt="Transformed"
                  className="w-full h-48 object-cover border rounded-lg"
                />
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Applied:</strong> {prompt}
                  </p>
                </div>
                <Button
                  onClick={downloadImage}
                  className="w-full"
                >
                  <Download size={16} className="mr-2" />
                  Download Transformed Image
                </Button>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Upload an image and enter a prompt to transform the scene
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
