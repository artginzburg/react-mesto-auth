export default function checkImageLoading(image) {
  return image.complete && image.naturalHeight !== 0;
}
