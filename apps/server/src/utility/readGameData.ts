import { promises as fs } from "fs";
import path from "path";

/**
 * Reads a JSON file from the "maps" folder and parses its contents into an object.
 *
 * @param filePath - Relative path to the JSON file inside the "maps" directory.
 * @returns A promise that resolves to the parsed JSON object.
 * @throws If the file cannot be read or the JSON is invalid.
 */
export async function readGameData<T = any>(filePath: string): Promise<T> {
  if (!filePath || typeof filePath !== "string") {
    throw new Error(
      "Invalid filePath provided. It must be a non-empty string."
    );
  }

  // Resolve the full path to the JSON file
  const mapsDirectory = path.resolve(__dirname, "../../../../maps");
  const fullPath = path.join(mapsDirectory, filePath);

  try {
    const data = await fs.readFile(fullPath, "utf-8");
    return JSON.parse(data) as T; // Parse and return the JSON content
  } catch (error: any) {
    console.error(
      `Error reading or parsing JSON file at path "${fullPath}":`,
      error.message || error
    );
    throw new Error(
      `Failed to load game data from "${fullPath}". Please ensure the file exists and contains valid JSON.`
    );
  }
}
