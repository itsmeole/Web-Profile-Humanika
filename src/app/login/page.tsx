"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "humanika2024") {
            // Set cookie manually for simplicity
            document.cookie = "auth=true; path=/";
            router.push("/admin");
        } else {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 p-2 bg-white/5">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Login</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-md border border-white/10 bg-black/20 p-2 text-white outline-none focus:border-primary placeholder:text-muted-foreground/50"
                            placeholder="admin"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-white/10 bg-black/20 p-2 text-white outline-none focus:border-primary"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button variant="premium" className="w-full" type="submit">
                        Masuk Dashboard
                    </Button>
                </form>
            </div>
        </div>
    );
}
