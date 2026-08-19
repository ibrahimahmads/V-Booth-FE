import type { PixelCrop } from 'react-image-crop';

export const getCroppedImg = (
  image: HTMLImageElement,
  pixelCrop: PixelCrop
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas =  document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if(!ctx){
      reject(new Error('Gagal membuat context 2D canvas'));
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = pixelCrop.x * scaleX;
    const cropY = pixelCrop.y * scaleY;
    const cropWidth = pixelCrop.width * scaleX;
    const cropHeight = pixelCrop.height * scaleY;

    canvas.width = Math.floor(cropWidth);
    canvas.height = Math.floor(cropHeight);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );

    resolve(canvas.toDataURL('image/jpeg', 0.92));
  });
};