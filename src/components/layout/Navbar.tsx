"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

const links = [
    { href: "#about", label: "Tentang Kami" },
    { href: "#structure", label: "Struktur" },
    { href: "#news", label: "Berita" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="w-full px-6 md:px-12">
                <div className="flex h-17 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-14 w-14">
                            <Image
                                src="/logo.png"
                                alt="HUMANIKA Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold leading-none text-primary">HUMANIKA</span>
                            <span className="text-xs text-muted-foreground">STT Wastukancana Purwakarta</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
                    <Container className="py-4 space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-3 text-lg font-medium text-muted-foreground hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Container>
                </div>
            )}
        </nav>
    );
};
