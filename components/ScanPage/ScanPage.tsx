import "./ScanPage.css";

export default function ScanPage() {
    return(
        <>
            <main className="scanpage-container">
                <div className="dropContainer">
                    <img className="importIcon" src="/icons/import-icon.png"/>
                    <span className="dropUpper">Upload or take a photo of a waste item here</span>
                    <span className="dropLower">Make sure you capture the full item</span>
                </div>
            </main>
        </>
    )
}