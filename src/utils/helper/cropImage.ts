export interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getCroppedImg = (
  imageSrc: string,
  pixelCrop: Area
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Canvas context not found'));
        return;
      }

      // Set ukuran canvas hasil potongan
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Gambar bagian foto yang dipotong ke canvas baru
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      // Export ke Base64 Data URL
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    image.onerror = (error) => reject(error);
  });
};