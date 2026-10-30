import type { Metadata } from "next";
import Link from "next/link";
import {
    Atom,
    Blocks,
    BrainCircuit,
    Cpu,
    Database,
    KeyRound,
    Layers3,
    LockKeyhole,
    ScanSearch,
    Server,
    Sparkles,
    Workflow,
    type LucideIcon,
} from "lucide-react";
import "./aboutus.css";

export const metadata: Metadata = {
    title: "About RecAIcle",
    description: "Learn what the RecAIcle project does and which technologies power it.",
};

const resources: {
    name: string;
    description: string;
    icon: LucideIcon;
    status?: string;
}[] = [
    { name: "FastAPI", description: "Python API that receives images and returns scan predictions.", icon: Server },
    { name: "Hugging Face Transformers", description: "Loads and runs the image-classification pipeline.", icon: Workflow },
    { name: "Hugging Face model", description: "The garbage-types image classifier used to predict a material and confidence score.", icon: BrainCircuit },
    { name: "Prisma ORM", description: "Provides the database schema and type-safe queries.", icon: Blocks },
    { name: "PostgreSQL", description: "Stores application data, including accounts and scan records.", icon: Database },
    { name: "bcrypt.js", description: "Hashes account passwords before they are stored.", icon: LockKeyhole },
    { name: "JOSE", description: "Creates and verifies the signed tokens used for authentication.", icon: KeyRound },
    { name: "Lucide React", description: "Provides the interface icons used throughout the app.", icon: Sparkles },
    { name: "Tailwind CSS", description: "Utility classes used to style parts of the interface.", icon: Layers3 },
    {
        name: "YOLO / Ultralytics",
        description: "Computer-vision toolkit shown in the supplied resource reference; it is not currently used by the scanner.",
        icon: ScanSearch,
        status: "Not currently used",
    },
    { name: "React", description: "Builds the interactive user interface.", icon: Atom },
    { name: "Next.js", description: "Runs the web application and its page routing.", icon: Cpu },
];

export default function AboutUsPage() {
    return (
        <main className="about-page">
            <header className="about-intro">
                <p className="about-eyebrow">ABOUT THIS PROJECT</p>
                <h1>About RecAIcle</h1>
                <p>
                    RecAIcle is a project that uses image recognition to help people identify
                    what a waste item is made of and choose a suitable recycling category.
                </p>
            </header>

            <section className="about-section resources-section" id="resources" aria-labelledby="resources-title">
                <div className="about-section-heading">
                    <p className="about-eyebrow">BUILT WITH</p>
                    <h2 id="resources-title">Project resources</h2>
                    <p>A quick look at the tools and services behind RecAIcle.</p>
                </div>
                <div className="about-table-wrap">
                    <table className="about-table resources-table">
                        <thead>
                            <tr>
                                <th scope="col">Resource</th>
                                <th scope="col">How it is used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((resource) => {
                                const ResourceIcon = resource.icon;

                                return (
                                    <tr key={resource.name}>
                                        <th scope="row">
                                            <span className="resource-name">
                                                <span className="resource-icon" aria-hidden="true">
                                                    <ResourceIcon size={20} strokeWidth={1.8} />
                                                </span>
                                                <span>
                                                    {resource.name}
                                                    {resource.status && (
                                                        <small className="resource-status">{resource.status}</small>
                                                    )}
                                                </span>
                                            </span>
                                        </th>
                                        <td>{resource.description}</td>
                                    </tr>
                                );
                            })}
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
