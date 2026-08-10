import { useRef, useState } from "react";
import ModalBb from "@/BaseComponents/ModalBb";
import { router } from '@inertiajs/react';

function ModalReadCheque({ onDataExtracted }) {

    const [isOpen, setIsOpen] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const inputRef = useRef(null);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setDragging(false);
        setPreview(null);
        setFile(null);
        setLoading(false);
        setError("");
    }

    function handleFile(selectedFile) {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            setError("فقط فایل تصویری مجاز است.");
            return;
        }

        setError("");
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    }

    function handleDragOver(e) {
        e.preventDefault();
        setDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setDragging(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragging(false);

        const droppedFile = e.dataTransfer.files?.[0];
        handleFile(droppedFile);
    }

    function handleInputChange(e) {
        const selectedFile = e.target.files?.[0];
        handleFile(selectedFile);
    }

    async function submitImage() {
        if (!file) {
            setError("ابتدا یک تصویر انتخاب کنید.");
            return;
        }

        setLoading(true);
        setError("");

        router.post('/cheques/read-image', {
            image: file
        }, {
            forceFormData: true,
            onSuccess: (page) => {

            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    }

    return (
        <>
            <button type="button" className="second" onClick={openModal}>
                خواندن اطلاعات چک با تصویر
            </button>

            <ModalBb
                isOpen={isOpen}
                head="خواندن اطلاعات تصویر با هوش مصنوعی"
                tip="نیاز است اطلاعات را بررسی کنید"
                onClose={closeModal}
            >

                <div
                    className={`upload-box ${dragging ? "dragging" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleInputChange}
                    />

                    {!preview ? (
                        <div className="upload-placeholder">
                            <p>تصویر چک را اینجا رها کنید</p>
                            <span>یا برای انتخاب فایل کلیک کنید</span>
                        </div>
                    ) : (
                        <div className="preview-wrapper">
                            <img src={preview} alt="Cheque Preview" className="preview-image" />
                        </div>
                    )}

                </div>

                {error && <div className="error-text">{error}</div>}

                <div className="modal-actions">
                    <button type="button" className="second" onClick={closeModal}>
                        انصراف
                    </button>
                    <button type="button" className="primary" onClick={submitImage} disabled={loading}>
                        {loading ? "در حال پردازش..." : "استخراج اطلاعات"}
                    </button>
                </div>

            </ModalBb>
        </>

    );
}

export default ModalReadCheque;