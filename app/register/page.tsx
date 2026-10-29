"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../auth.css";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    async function handleRegister() {
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            })

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            router.push("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            setError("Unable to create your account. Please try again.");
        }
    }

	return (
		<main className="auth-page">
			<section className="auth-panel" aria-labelledby="register-title">
				<header className="auth-heading">
					<h1 id="register-title">Create your account</h1>
					<p>It only takes a moment to get started.</p>
				</header>
				<div className="auth-fields">
					{error && (
						<div className="error-cont" role="alert">
							<AlertCircle size={18} aria-hidden="true" />
							<span className="error-title">Error:</span>
							<span className="error-desc">{error}</span>
						</div>
					)}
					<label className="auth-field">
						<span>Your name</span>
						<input type="text" name="name" placeholder="How should we call you?" autoComplete="name"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
					</label>
					<label className="auth-field">
						<span>Email address</span>
						<input type="email" name="email" placeholder="you@example.com" autoComplete="email" 
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
					</label>
					<label className="auth-field">
						<span>Password</span>
						<input type="password" name="password" placeholder="Create a password" autoComplete="new-password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
					</label>
                    <label className="auth-field">
						<span>Repeat Password</span>
						<input type="password" name="password" placeholder="Create a password" autoComplete="new-password"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
					</label>
				</div>

				<button className="auth-submit" type="button" onClick={()=> handleRegister()}>
					<span>Create account</span>
					<ArrowRight size={18} aria-hidden="true" />
				</button>

				<p className="auth-switch">Already have an account? <Link href="/login">Log in</Link></p>
			</section>
		</main>
	);
}