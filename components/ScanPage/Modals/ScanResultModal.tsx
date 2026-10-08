import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import "./ScanResultModal.css";

type ScanResultModalProps = {
    category: string;
    confidence: number;
    imagePreviewUrl?: string | null;
    onClose: () => void;
};

const materialIcons: Record<string, string> = {
    battery: "Batteries.png",
    batteries: "Batteries.png",
    biological: "Organic.png",
    cardboard: "Papper.png",
    cloth: "Textile.png",
    clothes: "Textile.png",
    fabric: "Textile.png",
    glass: "Glass.png",
    "brown glass": "Glass.png",
    "green glass": "Glass.png",
    "white glass": "Glass.png",
    metal: "Rest.png",
    organic: "Organic.png",
    paper: "Papper.png",
    papper: "Papper.png",
    plastic: "Plastic.png",
    rest: "Rest.png",
    textile: "Textile.png",
    trash: "Rest.png",
};

function getCategoryPresentation(category: string) {
    const normalizedCategory = category.trim().toLowerCase().replaceAll("_", " ").replaceAll("-", " ");
    const icon = materialIcons[normalizedCategory] ?? "Rest.png";
    const label = normalizedCategory.replace(/\b\w/g, (letter) => letter.toUpperCase());

    return { icon, label };
}

export default function ScanResultModal({
    category,
    confidence,
    imagePreviewUrl,
    onClose,
}: ScanResultModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { icon, label } = getCategoryPresentation(category);
    const confidencePercent = Math.min(100, Math.max(0, confidence * 100));

    useEffect(() => {
        const dialog = dialogRef.current;

        if (dialog && !dialog.open) {
            dialog.showModal();
        }

        return () => {
            if (dialog?.open) {
                dialog.close();
            }
        };
    }, []);

    return (
        <dialog
            ref={dialogRef}
            className="result-dialog"
            aria-labelledby="result-title"
            aria-describedby="result-description"
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div className="result-modal">
                <header className="result-header">
                    <div>
                        <p className="result-eyebrow">SCAN COMPLETE</p>
                        <h2 id="result-title">Your item belongs in</h2>
                    </div>
                    <button
                        type="button"
                        className="result-close"
                        aria-label="Close result"
                        onClick={onClose}
                    >
                        <X size={20} aria-hidden="true" />
                    </button>
                </header>

                <div className="result-main">
                    <div className="result-category">
                        <div className="result-material-icon">
                            <Image src={`/materials/${icon}`} alt="" width={76} height={76} />
                        </div>
                        <div>
                            <p className="result-category-label">RECYCLING CATEGORY</p>
                            <p className="result-category-name">{label}</p>
                        </div>
                    </div>

                    {imagePreviewUrl && (
                        <figure className="result-preview">
                            <Image
                                src={imagePreviewUrl}
                                alt={`Scanned ${label.toLowerCase()} item`}
                                width={280}
                                height={200}
                                unoptimized
                            />
                            <figcaption>Scanned image</figcaption>
                        </figure>
                    )}
                </div>

                <section className="result-confidence" aria-label="Model confidence">
                    <div className="result-confidence-copy">
                        <span>Match confidence</span>
                        <strong>{confidencePercent.toFixed(1)}%</strong>
                    </div>
                    <div
                        className="result-confidence-track"
                        role="meter"
                        aria-label="Match confidence"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={confidencePercent}
                    >
                        <span style={{ width: `${confidencePercent}%` }} />
                    </div>
                    <p id="result-description">This is the model’s confidence in its material match.</p>
                </section>

                <button type="button" className="result-done" onClick={onClose}>
                    Done
                </button>
            </div>
        </dialog>
    );
}