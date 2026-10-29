"use client";
import { useEffect, useState } from "react";
import "./LoadingScreen.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

let loadingAnimationPromise: Promise<ArrayBuffer> | null = null;

function loadLoadingAnimation() {
    if (!loadingAnimationPromise) {
        loadingAnimationPromise = fetch("/animations/loading.lottie")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Loading animation request failed: ${response.status}`);
                }

                return response.arrayBuffer();
            })
            .catch((error: unknown) => {
                loadingAnimationPromise = null;
                throw error;
            });
    }

    return loadingAnimationPromise;
}

export default function LoadingScreen() {
    const [animationData, setAnimationData] = useState<ArrayBuffer | null>(null);

    useEffect(() => {
        let isMounted = true;

        loadLoadingAnimation()
            .then((data) => {
                if (isMounted) {
                    setAnimationData(data);
                }
            })
            .catch((error: unknown) => {
                if (isMounted) {
                    console.error("Failed to load loading animation.", error);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return(
        <div className="loadingBody">
            {animationData ? (
                <DotLottieReact data={animationData} loop autoplay />
            ) : (
                <div className="loadingSpinner" role="status" aria-label="Loading" />
            )}
        </div>
    )
}