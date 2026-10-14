"use client";
import "./LoadingScreen.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingScreen() {
    return(
        <div className="loadingBody">
            <DotLottieReact
                src="/animations/loading.lottie"
                loop
                autoplay
            />
        </div>
    )
}