export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_IMAGE_DIMENSION = 1024;
export const SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
] as const;

export interface OptimizedImage {
  file: File;
  dataUrl: string;
  width: number;
  height: number;
  wasOptimized: boolean;
}

/** Decode, resize and compress an image entirely in the browser. */
export async function optimizeImage(file: File): Promise<OptimizedImage> {
  if (
    !SUPPORTED_IMAGE_TYPES.includes(
      file.type as (typeof SUPPORTED_IMAGE_TYPES)[number],
    )
  )
    throw new Error("Image format not supported");

  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Image could not be processed"));
      element.src = sourceUrl;
    });
    if (!image.naturalWidth || !image.naturalHeight)
      throw new Error("Image could not be processed");

    const scale = Math.min(
      1,
      MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Image could not be processed");
    context.drawImage(image, 0, 0, width, height);

    const outputType = "image/webp";
    let quality = 0.88;
    let blob: Blob | null = null;
    do {
      blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, outputType, quality),
      );
      quality -= 0.12;
    } while (blob && blob.size > MAX_IMAGE_BYTES && quality >= 0.4);
    if (!blob) throw new Error("Image could not be processed");
    const optimizedFile = new File(
      [blob],
      `${file.name.replace(/\.[^.]+$/, "")}.webp`,
      {
        type: outputType,
      },
    );
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Image could not be processed"));
      reader.readAsDataURL(optimizedFile);
    });
    return {
      file: optimizedFile,
      dataUrl,
      width,
      height,
      wasOptimized:
        file.size > MAX_IMAGE_BYTES || scale < 1 || file.type !== outputType,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Image format not supported"
    )
      throw error;
    throw new Error("Image could not be processed");
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}
