import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './PDFViewer.css'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({ open, onClose, info }) => {
    const pdf = `https://gateway.pinata.cloud/ipfs/${info}`;
    console.log('row value', info)
    const newplugin = defaultLayoutPlugin();
    // const viewPDF="https://ipfs.io/ipfs/QmaNxbQNrJdLzzd8CKRutBjMZ6GXRjvuPepLuNSsfdeJRJ";
    if (!open) return null

    return (
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content-pdf ' >
                <h5></h5><br />
                <div className='pdf-container'>
                    <Worker workerUrl='http://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js'>
                        {pdf && <>
                            <Viewer fileUrl={pdf} plugins={[newplugin]} />
                        </>}
                        {!pdf && <>no PDF</>}
                    </Worker>
                    {/* <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} /> */}
                </div>
                <br />
                <button type="button" onClick={onClose} class="btn btn-danger mb-2 btn-sm " style={{ position: 'absolute', top: '10px', right: '10px' }}>close</button>
            </div>
        </div>
    )
}

export default PDFViewer