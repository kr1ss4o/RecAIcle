"use client";

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import ImageUploader from "./ImageUploader";
import ScanResultModal from "./Modals/ScanResultModal";
import "./ScanPage.css";

type ScanResult = {
    category: string;
    confidence: number;
};

export default function ScanPage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState("");

    // NEW: stores the AI result
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);

    useEffect(() => {
        if (!selectedImage) {
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(selectedImage);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedImage]);

    async function handleAnalyze() {
        if (!selectedImage || isAnalyzing) return;

        setIsAnalyzing(true);
        setScanResult(null);
        setError("");

        try {
            const formData = new FormData();

            formData.append("file", selectedImage);

            const response = await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to analyze image");
            }

            const result: ScanResult = await response.json();

            setScanResult(result);

            console.log("AI Result:", result);

        } catch (error) {
            console.error("Error analyzing image:", error);
            setError("Failed to analyze image. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <main className="scanpage-container">
            <ImageUploader
                selectedImage={selectedImage}
                previewUrl={previewUrl}
                onImageSelect={(image) => {
                    setSelectedImage(image);
                    setError("");
                }}
            />

            {error && (
                <div className="error-cont" role="alert">
                    <AlertCircle size={18} aria-hidden="true" />
                    <span className="error-title">Error:</span>
                    <span className="error-desc">{error}</span>
                </div>
            )}

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

            {scanResult && (
                <ScanResultModal
                    category={scanResult.category}
                    confidence={scanResult.confidence}
                    imagePreviewUrl={previewUrl}
                    onClose={() => setScanResult(null)}
                />
            )}
        </main>
    );
}