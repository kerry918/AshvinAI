import React from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./Documents.css";
import documents from "../store/documents";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Documents = () => {
  const [numPages, setNumPages] = React.useState();
  const [pageNumber, setPageNumber] = React.useState(1);
  const [file, setFile] = React.useState(null);
  const docRef = React.useRef(null);
  const [controlPosition, setControlPosition] = React.useState({ top: 0, left: 0 });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
    workerSrc: "/pdf.worker.js"
  };

  const handleButtonClick = () => {
    if (docRef.current) {
      const docRect = docRef.current.getBoundingClientRect();
      setControlPosition({
        top: docRect.top - 200, 
        left: docRect.left - 300, 
      });
    }
  };

  const updateFile = (file) => {
    setFile(file);
    setPageNumber(1);
    handleButtonClick();
  }

  return (
    <div className="app">
      <div className="inner-container">
        <div className="app-header-container">
          <h1 className="app-header">Ashvin AI Document Classifier</h1>
          <div className="app-header-right">
            <a href="/" className="nav-link">Classification Results</a>
            <a href="/documents" className="nav-link">Documents</a>
          </div>
        </div>
        <div className="document-body-container">
          <div className="document-list">
            {documents.map((document) => {
              return (
                <div onClick={() => updateFile(document.file)} className="document-title">
                  <p>{document.title}</p>
                </div>
              )
            })}
          </div>
          <div className="document-section">
            <div className="document-container" ref={docRef}>
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options} style={{height: "400px"}}>
                <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
              </Document>
            </div>

            {file && (
              <div 
                style={{
                  position: "relative",
                  top: controlPosition.top,
                  left: controlPosition.left,
                }}
                className="page-control"
              >
                <div>
                  <button className="page-button" onClick={() => setPageNumber(pageNumber-1)} disabled={pageNumber <= 1}>Prev</button>
                  <button className="page-button" onClick={() => setPageNumber(pageNumber+1)} disabled={pageNumber > numPages - 1}>Next</button>
                </div>
                <p>
                  Page {pageNumber} of {numPages}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documents