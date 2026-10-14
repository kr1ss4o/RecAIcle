"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../auth.css";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleLogin() {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await response.json();
        
        if (!response.ok) {
            console.log(data.message);
            return;
        }

        router.push("/account");
    }

	return (
		<main className="auth-page">
			<section className="auth-panel" aria-labelledby="login-title">
				<header className="auth-heading">
					<h1 id="login-title">Welcome back</h1>
					<p>Log in to continue.</p>
				</header>
				<div className="auth-fields">
					<label className="auth-field">
						<span>Email address</span>
						<input type="email" name="email" placeholder="you@example.com" autoComplete="email"
                            value={email} onChange={(e)=>setEmail(e.target.value)}
                        />
					</label>
					<label className="auth-field">
						<span>Password</span>
						<input type="password" name="password" placeholder="Enter your password" autoComplete="current-password"
                            value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
					</label>
				</div>

				<button className="auth-submit" type="button" onClick={()=>handleLogin()}>
					<span>Log in</span>
					<ArrowRight size={18} aria-hidden="true" />
				</button>

				<p className="auth-switch">New to RecAIcle? <Link href="/register">Create an account</Link></p>
			</section>
		</main>
	);
}