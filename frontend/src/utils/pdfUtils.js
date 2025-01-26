import * as pdfjsLib from "pdfjs-dist/webpack"; // Use Webpack version of PDF.js

export const generatePdfThumbnail = async (pdfUrl) => {
  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise; // Load the PDF
    const page = await pdf.getPage(1); // Get the first page

    // Set up the viewport for rendering (adjust scale for thumbnail size)
    const viewport = page.getViewport({ scale: 0.5 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set the canvas dimensions
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render the page into the canvas
    await page.render({ canvasContext: context, viewport }).promise;

    // Convert the canvas to a Data URL (image)
    return canvas.toDataURL();
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error);
    return null;
  }
};
