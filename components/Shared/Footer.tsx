import "./Footer.css";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center items-center gap-[30px]">
                <div className="footerSection">
                    <h2 className="footerUpper">More:</h2>
                    <Link className="footerLower" href="/aboutus">Technologies and Purpose</Link>
                    <Link className="footerLower" href="/wastelegend">Waste Legend</Link>
                </div>
                <div className="footerSection">
                    <h2 className="footerUpper">Support:</h2>
                    <span className="footerLower">info@recaicle.nl</span>
                    <span className="footerLower">+31 (0) 111 111 111</span>
                </div>
            </div>
            <span className="footerLower">RecAIcle 2026 © All rights reserved</span>
        </footer>
    )
}