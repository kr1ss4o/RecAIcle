"use client";

import "./account.css";
import { useState } from "react";
import { PenLine } from "lucide-react";
import { Check } from "lucide-react";

export default function Account() {
    const [editingName, setEditingName] = useState(false);
    const [editingEmail, setEditingEmail] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    
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
                            <button className="inputEdit save" type="button" aria-label="Save name" onClick={() => {setEditingName(false)}}>
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
                            <button className="inputEdit save" type="button" aria-label="Save email address" onClick={() => {setEditingEmail(false)}}>
                                <Check size={12}/>
                            </button>
                        ):(
                            <button className="inputEdit" type="button" aria-label="Edit email address" onClick={() => setEditingEmail(true)}>
                                <PenLine size={12}/>
                            </button>
                        )}
                        </div>
                    </div>
                   
                </section>
                <section className="account-sections">
                    <h1 className="sectionTitle">Account security</h1>
                    <button className="securityButton password">Change password</button>
                    <button className="securityButton delete">Delete account</button>
                </section>
        </main>
    )
}