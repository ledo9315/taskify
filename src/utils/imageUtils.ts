/**
 * Converts a File object to a base64 string
 * @param file - The file to convert
 * @returns Promise that resolves to the base64 string representation of the file
 */
export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
