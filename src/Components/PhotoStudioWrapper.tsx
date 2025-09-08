import fs from "fs";
import path from "path";
import PhotoStudio from "./PhotoStudio";

export default function PhotoStudioWrapper() {
  // Path to the photostudio folder
  const imagesDir = path.join(process.cwd(), "public/photostudio");

  // Safely read files from the directory
  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir);
  } catch (error) {
    console.warn("⚠️ No photostudio folder found in /public");
  }

  // Build URLs to images
  const images = files
    .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file)) // filter image types
    .map((file) => `/photostudio/${file}`); // prepend public path

  return <PhotoStudio images={images} />;
}
