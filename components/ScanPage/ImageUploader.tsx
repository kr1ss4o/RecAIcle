
"use client";

import { useState, type DragEvent } from "react";

type ImageUploaderProps = {
    selectedImage: File | null;
    previewUrl: string | null;
    onImageSelect: (file: File) => void;
};

export default function ImageUploader({
    selectedImage,
    previewUrl,
    onImageSelect,
}: ImageUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);

    function handleDrop(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];

        if (file && file.type.startsWith("image/")) {
            onImageSelect(file);
        }
    }

    return (
        <div
            className={`dropContainer ${isDragging ? "dragging" : ""}`}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            <label htmlFor="waste-image" className="dropLabel">
                {selectedImage && previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Selected waste item"
                        className="imagePreview"
                    />
                ) : (
                    <>
                        <img
                            className="importIcon"
                            src="/icons/import-icon.png"
                            alt=""
                        />

                        <span className="dropUpper">
                            Upload or take a photo of a waste item here
                        </span>

                        <span className="dropLower">
                            Make sure you capture the full item
                        </span>
                    </>
                )}
            </label>

            <input
                id="waste-image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file && file.type.startsWith("image/")) {
                        onImageSelect(file);
                    }
                }}
            />
        </div>
    );
}
