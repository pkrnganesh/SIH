const fs = require('fs');
const path = require('path');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const extractTextFromImage = (imagePath) => {
    return Tesseract.recognize(
        imagePath,
        'eng',
        {
           
        }
    ).then(({ data: { text } }) => {
        return text;
    });
};

const extractTextFromPDF = (pdfPath) => {
    const dataBuffer = fs.readFileSync(pdfPath);
    return pdfParse(dataBuffer).then(data => {
        return data.text;
    });
};

const extractTextFromDoc = (docPath) => {
    return mammoth.extractRawText({ path: docPath })
        .then(result => {
            return result.value;
        });
};

const extractText = (filePath) => {
    const fileExt = path.extname(filePath).toLowerCase();
    switch (fileExt) {
        case '.jpg':
        case '.jpeg':
        case '.png':
            return extractTextFromImage(filePath);
        case '.pdf':
            return extractTextFromPDF(filePath);
        case '.doc':
        case '.docx':
            return extractTextFromDoc(filePath);
        default:
            return Promise.reject(new Error('Unsupported file type'));
    }
};
module.exports = { extractText };
