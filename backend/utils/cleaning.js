//cleaning
const textCleaning = (rawText) => {
  const cleanText = rawText
    // Normalize newlines → space
    .replace(/\r?\n|\r/g, " ")
    // Remove multiple spaces
    .replace(/\u00a0/g, " ")

    // Remove page numbers
    // .replace(/Page\s?\d+/gi, "")

    // Remove figure references
    .replace(/FIGURE\s?P?\d+[A-Z]?\s*/gi, "")
    // Remove headers like cen58933_ch15.qxd...
    .replace(/cen\d+_ch\d+\.qxd.*?(AM|PM)/gi, "")
    // Remove large OCR junk numbers
    .replace(/\b\d{5,}\b/g, "")
    // Remove hyphen breaks
    .replace(/-\s+/g, "")
    // Collapse extra spaces
    .replace(/\s{2,}/g, " ")
    // Add space between number and letter
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    // Split stuck words with capital letters
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // Fix units like 20cm → 20 cm
    .replace(/([0-9]+)([A-Za-z]+)/g, "$1 $2")
    // Fix multiple commas
    .replace(/,+/g, ",")
    // Add space before degree symbol if missing
    .replace(/(?<!\d)°/g, " °")
    // Remove unwanted special characters but keep essential ones
    .replace(/[^\w\s.,°°C:/-]/g, "")
    .trim();
  return cleanText;
};

export default textCleaning;
