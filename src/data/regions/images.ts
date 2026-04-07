/** Real placeholder images available in /public/test-images/ */
export const PLACEHOLDER_IMAGES = [
  '/test-images/AdobeStock_164779985.jpeg',
  '/test-images/AdobeStock_286007082.jpeg',
  '/test-images/AdobeStock_291250504.jpeg',
  '/test-images/AdobeStock_39828282.jpeg',
  '/test-images/AdobeStock_805204520.jpeg',
  '/test-images/AdobeStock_85747125.jpeg',
  '/test-images/AdobeStock_86969265.jpeg',
] as const;

/** Rotate through placeholder images by index */
export function img(index: number): string {
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
}
