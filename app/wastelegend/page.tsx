import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "../aboutus/aboutus.css";

export const metadata: Metadata = {
    title: "Waste Legend | RecAIcle",
    description: "Understand the recycling categories and material icons shown by RecAIcle.",
};

const materials = [
    {
        name: "Batteries",
        icon: "Batteries.png",
        description: "Batteries and other items that need a dedicated battery collection point.",
    },
    {
        name: "Glass",
        icon: "Glass.png",
        description: "Glass packaging, such as bottles and jars.",
    },
    {
        name: "Organic",
        icon: "Organic.png",
        description: "Biodegradable food and garden waste.",
    },
    {
        name: "Paper",
        icon: "Papper.png",
        description: "Paper and cardboard products.",
    },
    {
        name: "Plastic",
        icon: "Plastic.png",
        description: "Plastic packaging and other plastic items.",
    },
    {
        name: "Residual waste",
        icon: "Rest.png",
        description: "Items that do not fit the other categories and cannot be sorted for recycling.",
    },
    {
        name: "Textile",
        icon: "Textile.png",
        description: "Clothing, fabric, and other textile items.",
    },
];

export default function WasteLegendPage() {
    return (
        <main className="about-page">
            <header className="about-intro">
                <p className="about-eyebrow">RECYCLING CATEGORIES</p>
                <h1>Waste Legend</h1>
                <p>
                    Use this guide to understand the material icons RecAIcle shows with
                    your scan results.
                </p>
            </header>

            <section className="about-section" aria-labelledby="materials-title">
                <div className="about-section-heading">
                    <p className="about-eyebrow">KNOW YOUR SORTING ICONS</p>
                    <h2 id="materials-title">What each material icon means</h2>
                    <p>Check what each category represents before sorting your item.</p>
                </div>
                <div className="about-table-wrap">
                    <table className="about-table materials-table">
                        <thead>
                            <tr>
                                <th scope="col">Icon and material</th>
                                <th scope="col">What it represents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map((material) => (
                                <tr key={material.name}>
                                    <th scope="row">
                                        <span className="material-name">
                                            <Image
                                                src={`/materials/${material.icon}`}
                                                alt=""
                                                width={48}
                                                height={48}
                                            />
                                            <span>{material.name}</span>
                                        </span>
                                    </th>
                                    <td>{material.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <Link className="about-back-link" href="/">
                Back to scanning
            </Link>
        </main>
    );
}
