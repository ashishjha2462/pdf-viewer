
import React, { useRef, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './PdfUploader.css'; // Import the CSS file

const PdfUploader = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const url = URL.createObjectURL(file);
            setPdfFile(url);
            setError('');
        } else {
            setError('Please upload a valid PDF file.');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="pdf-uploader-container">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <button className="upload-button" onClick={handleButtonClick}>Upload PDF</button>
            {error && <p className="error-message">{error}</p>}
            {pdfFile && (
                <div className="pdf-viewer-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} loading="lazy"/>
                    </Worker>
                </div>
            )}
        </div>
    );
};

export default PdfUploader;
