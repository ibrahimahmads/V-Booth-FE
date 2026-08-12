import type { PixelCrop } from 'react-image-crop';

export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('No 2d context'));
        return;
      }

      // Hitung skala berdasarkan ukuran tampilan gambar vs ukuran asli
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      // Set ukuran canvas hasil potongan
      canvas.width = pixelCrop.width * scaleX;
      canvas.height = pixelCrop.height * scaleY;

      ctx.imageSmoothingQuality = 'high';

      // Gambar area potongan
      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY
      );

      // Convert ke base64
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };

    image.onerror = (error) => reject(error);
  });
};