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
                    <div className="inputGroup">
                        <input className="accountInput"
                            placeholder="John Doe"
                            value={name}
                            readOnly={!editingName}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        {editingName ? (
                            <button className="inputEdit save" onClick={() => {setEditingName(false)}}>
                                <Check size={12}/>
                            </button>
                        ):(
                            <button className="inputEdit" onClick={() => setEditingName(true)}>
                                <PenLine size={12}/>
                            </button>
                        )}
                        
                    </div>
                    <div className="inputGroup">
                        <input className="accountInput"
                            placeholder="example@example.com"
                            value={email}
                            readOnly={!editingEmail}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        {editingEmail ? (
                            <button className="inputEdit save" onClick={() => {setEditingEmail(false)}}>
                                <Check size={12}/>
                            </button>
                        ):(
                            <button className="inputEdit" onClick={() => setEditingEmail(true)}>
                                <PenLine size={12}/>
                            </button>
                        )}
                        
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