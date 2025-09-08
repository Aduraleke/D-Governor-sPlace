import fs from "fs";
import path from "path";

export function getPhotoStudioImages(): string[] {
  const photosDir = path.join(process.cwd(), "public", "photostudio");

  try {
    const files = fs.readdirSync(photosDir);
    return files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `/photostudio/${file}`);
  } catch (error) {
    console.error("Error reading photostudio images:", error);
    return [];
  }
}
