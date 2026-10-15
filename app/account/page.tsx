"use client";

import "./account.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PenLine } from "lucide-react";
import { Check } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function Account() {
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const router = useRouter();

    type User = {
        id: string;
        name: string;
        email: string;
    }

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Backend verifies and gets the info for useEffect to assign to the useStates
    useEffect(() => {
        async function getAccount() {
            const response = await fetch("/api/auth/account");

            if (!response.ok) {
                router.replace("/login");
                return;
            }

            const data = await response.json();

            setUser(data.user);
            setName(data.user.name);
            setEmail(data.user.email);
            setIsLoading(false);
        }
        getAccount();
    }, [router]);

    // Logout function called by the logout button
    async function handleLogout() {

        const response = await fetch("/api/auth/logout", {
            method: "POST"
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message);
        }

        router.push("/login");
    }

    async function handleSaveName() {

        const response = await fetch("/api/auth/account", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name
            })
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message)
        }

        setUser(data.user);
        setEditingName(false);
    }
    
    async function handleSaveEmail() {

        const response = await fetch("/api/auth/account", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.message)
        }

        setUser(data.user);
        setEditingEmail(false);
    }

    // Wait for the request to finish before render
    if (isLoading) {
        return <LoadingScreen/>
    }
    
    return(
        <main className="account-container">
                <section className="account-sections">
                    <h1 className="sectionTitle">Account information</h1>
                    <div className="accountField">
                        <label className="accountLabel" htmlFor="account-name">Name</label>
                        <div className="inputGroup">
                            <input
                                id="account-name"
                                className="accountInput"
                                placeholder="Add your name"
                                autoComplete="name"
                                value={name}
                                readOnly={!editingName}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        {editingName ? (
                            <button className="inputEdit save" type="button" aria-label="Save name" onClick={() => {handleSaveName()}}>
                                <Check size={12}/>
                            </button>
                        ):(
                            <button className="inputEdit" type="button" aria-label="Edit name" onClick={() => setEditingName(true)}>
                                <PenLine size={12}/>
                            </button>
                        )}
                        </div>
                    </div>
                    <div className="accountField">
                        <label className="accountLabel" htmlFor="account-email">Email address</label>
                        <div className="inputGroup">
                            <input
                                id="account-email"
                                className="accountInput"
                                type="email"
                                placeholder="Add your email address"
                                autoComplete="email"
                                value={email}
                                readOnly={!editingEmail}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        {editingEmail ? (
                            <button className="inputEdit save" type="button" aria-label="Save email address" onClick={() => {handleSaveEmail()}}>
                                <Check size={12}/>
                            </button>
                        ):(
                            <button className="inputEdit" type="button" aria-label="Edit email address" onClick={()=> setEditingEmail(true)}>
                                <PenLine size={12}/>
                            </button>
                        )}

                        </div>
                    </div>
                   
                </section>
                <section className="account-sections">
                    <h1 className="sectionTitle">Account security</h1>
                    <button className="securityButton password" onClick={()=>handleLogout()}>Log out</button>
                    <button className="securityButton password">Change password</button>
                    <button className="securityButton delete">Delete account</button>
                </section>
        </main>
    )
}