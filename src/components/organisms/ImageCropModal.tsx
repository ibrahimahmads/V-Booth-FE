import { useState } from 'react';
import Cropper, { type Point, type Area } from 'react-easy-crop';
import { X, Check } from 'lucide-react';
import Button from '../atoms/Button';
import { getCroppedImg } from '../../utils/helper/cropImage';

interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
}

export default function ImageCropModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !imageSrc) return null;

  const handleCropCompleteCallback = (_: Area, newCroppedAreaPixels: Area) => {
    setCroppedAreaPixels(newCroppedAreaPixels);
  };

  const handleSaveCrop = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/80 flex flex-col justify-between animate-in fade-in">
      {/* Header Modal */}
      <div className="p-4 flex items-center justify-between text-white z-10">
        <h3 className="text-sm font-semibold">Potong Foto</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Area Cropper (Layar Penuh Touchscreen-Friendly) */}
      <div className="relative flex-1 w-full bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          showGrid={true}
          objectFit="contain"
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropCompleteCallback}
        />
      </div>

      {/* Controls & Footer */}
      <div className="p-4 bg-slate-900 space-y-4 z-10">
        {/* Slider Zoom */}
        <div className="flex items-center gap-3 max-w-xs mx-auto">
          <span className="text-xs text-white/70">Zoom</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 max-w-xs mx-auto">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            fullWidth
            icon={<Check className="w-4 h-4" />}
            onClick={handleSaveCrop}
            disabled={isProcessing}
          >
            {isProcessing ? 'Memotong...' : 'Terapkan'}
          </Button>
        </div>
      </div>
    </div>
  );
}