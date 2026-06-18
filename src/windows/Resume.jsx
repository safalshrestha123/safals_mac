import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import WindowControls from "#components/WindowControls.jsx";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Resume = () => {
    const previewRef = useRef(null);
    const [pageWidth, setPageWidth] = useState(0);

    useEffect(() => {
        const preview = previewRef.current;
        if (!preview) return;

        const observer = new ResizeObserver(([entry]) => {
            const width = Math.floor(entry.contentRect.width) - 16;
            if (width > 0) setPageWidth(width);
        });

        observer.observe(preview);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>
                <a
                    href="/files/resume.pdf"
                    download="Safal-Shrestha-Resume.pdf"
                    className="icon"
                    aria-label="Download resume"
                >
                    <Download className="size-4" />
                </a>
            </div>

            <div ref={previewRef} className="resume-preview">
                <Document
                    file="/files/resume.pdf"
                    loading={<p className="resume-status">Loading resume...</p>}
                    error={
                        <p className="resume-status">
                            Unable to display the resume. Use the download button instead.
                        </p>
                    }
                >
                    {pageWidth > 0 && <Page pageNumber={1} width={pageWidth} />}
                </Document>
            </div>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
