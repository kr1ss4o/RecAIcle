"use client";
import "./LoadingScreen.css";

export default function LoadingScreen() {
    return(
        <div className="loadingBody">
            <div className="loadingSpinner" role="status" aria-label="Loading" />
        </div>
    )
}