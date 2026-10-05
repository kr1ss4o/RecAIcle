import "./Navbar.css"
import  { CircleUserRound, ScanLine } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return(
        <nav className="navbar">
            <Link href="/" className="smallNav" aria-label="Scan waste item">
                <ScanLine size={25}/>
            </Link>
            <div className="bigNav">
                <label>RecAIcle</label>
            </div>
            <Link href="/account" className="smallNav" aria-label="Account">
                <CircleUserRound size={25}/>
            </Link>
        </nav>
    )
}