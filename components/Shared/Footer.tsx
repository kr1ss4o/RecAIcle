import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="flex justify-center items-center gap-[30px]">
                <div className="footerSection">
                    <h2 className="footerUpper">About us:</h2>
                    <span className="footerLower">What is RecAIcle</span>
                    <span className="footerLower">Technologies</span>
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