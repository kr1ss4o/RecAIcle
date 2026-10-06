
"use client";

import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import "./ScanPage.css";

export default function ScanPage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // NEW: Track whether the AI is analyzing
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        if (!selectedImage) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedImage);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedImage]);

    // NEW: Analyze function
    async function handleAnalyze() {
        if (!selectedImage || isAnalyzing) return;

        setIsAnalyzing(true);

        try {
            // Temporary simulation of AI analysis
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Analyzed image:", selectedImage.name);
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <main className="scanpage-container">
            <ImageUploader
                selectedImage={selectedImage}
                previewUrl={previewUrl}
                onImageSelect={setSelectedImage}
            />

            {/* NEW: Analyze button */}
            {selectedImage !== null && (
                <button
                    type="button"
                    className="analyzeButton"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                >
                    {isAnalyzing ? "Analyzing..." : "Analyze Waste"}
                </button>
            )}
        </main>
    );
}