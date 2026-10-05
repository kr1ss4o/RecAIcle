import QRCode from "react-qr-code";
import { CircleUserRound, Info } from "lucide-react";
import "./DesktopLanding.css";

export default function DesktopLanding() {
    return (
        <main className="landing-container">
            <h1 className="landing-title">RecAIcle works best on a mobile device</h1>
            <h4 className="landing-subtitle">Scan the QR code and make your first scan</h4>
            <div className="interactions-container">
                <div className="qr-code-container">
                    <QRCode value="https://example.com" className="w-full object-contain min-h-[200px] min-w-[200px]" />
                </div>
                <div className="buttons-container">
                    <button className="landing-button">
                        My Account
                        <CircleUserRound size={35} />
                    </button>
                    <button className="landing-button">
                        About Us
                        <Info size={35} />
                    </button>
                    <button className="landing-button">
                        Waste Legend
                        <img src="/icons/waste-icon.png" alt="Waste Legend" className="waste-icon" />
                    </button>
                </div>
            </div>
        </main>
    )
}