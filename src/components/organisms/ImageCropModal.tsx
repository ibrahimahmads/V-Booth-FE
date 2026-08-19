import { useState, useRef } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check, RotateCcw } from 'lucide-react';
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
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  if (!isOpen || !imageSrc) return null;

  // Set default area crop awal ketika gambar selesai dimuat di modal
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidth = Math.min(width, height) * 0.8;
    
    // Posisikan kotak crop default di tengah-tengah modal
    const defaultCrop: Crop = {
      unit: 'px',
      x: (width - cropWidth) / 2,
      y: (height - cropWidth) / 2,
      width: cropWidth,
      height: cropWidth,
    };
    setCrop(defaultCrop);
  };

  const handleReset = () => {
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      const cropWidth = Math.min(width, height) * 0.8;
      setCrop({
        unit: 'px',
        x: (width - cropWidth) / 2,
        y: (height - cropWidth) / 2,
        width: cropWidth,
        height: cropWidth,
      });
    }
  };

  const handleSaveCrop = async () => {
    if (!completedCrop || !imgRef.current) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imgRef.current, completedCrop);
      onCropComplete(croppedImage);
      onClose();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 bg-black/90 flex flex-col justify-between animate-in fade-in">
      {/* Header Modal */}
      <div className="p-4 flex items-center justify-between text-white z-10 bg-black/40 backdrop-blur-md">
        <div>
          <h3 className="text-sm font-semibold">Potong Foto (Freeform)</h3>
          <p className="text-[10px] text-slate-400">Tarik titik di sudut/sisi untuk memotong gambar</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Area Cropper */}
      <div className="relative flex-1 w-full flex items-center justify-center p-4 bg-black overflow-auto">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          className="max-h-[65vh]"
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="Crop target"
            onLoad={onImageLoad}
            className="max-h-[65vh] w-auto object-contain"
            crossOrigin="anonymous"
          />
        </ReactCrop>
      </div>

      {/* Footer Controls */}
      <div className="p-4 pb-10 bg-slate-900 border-t border-slate-800 space-y-3 z-10">
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Potongan</span>
          </button>
        </div>

        <div className="flex gap-3 max-w-sm mx-auto">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            fullWidth
            icon={<Check className="w-4 h-4" />}
            onClick={handleSaveCrop}
            disabled={isProcessing || !completedCrop?.width}
          >
            {isProcessing ? 'Memotong...' : 'Terapkan'}
          </Button>
        </div>
      </div>
    </div>
  );
}