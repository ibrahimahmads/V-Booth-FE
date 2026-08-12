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
  // State crop bebas (Freeform)
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  if (!isOpen || !imageSrc) return null;

  const handleReset = () => {
    setCrop({
      unit: '%',
      x: 10,
      y: 10,
      width: 80,
      height: 80,
    });
  };

  const handleSaveCrop = async () => {
    if (!completedCrop || !imageSrc) return;
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(imageSrc, completedCrop);
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

      {/* Area Cropper (8 Titik Handle Bebas Ditarik) */}
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
            className="max-h-[65vh] w-auto object-contain"
            crossOrigin="anonymous"
          />
        </ReactCrop>
      </div>

      {/* Footer Controls (Diatur pb-10 agar tidak mepet bawah HP) */}
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

        {/* Tombol Aksi Batal & Terapkan */}
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