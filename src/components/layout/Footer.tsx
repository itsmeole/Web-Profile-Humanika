import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black py-12 text-muted-foreground">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">HUMANIKA</h3>
                        <p className="text-sm">
                            Himpunan Mahasiswa Teknik Informatika<br />
                            STT Wastukancana Purwakarta
                        </p>
                        <p className="text-sm">
                            Low Profile and No Talk Only
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Navigasi</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-primary">Tentang Kami</Link></li>
                            <li><Link href="/structure" className="hover:text-primary">Struktur Organisasi</Link></li>
                            <li><Link href="/news" className="hover:text-primary">Berita</Link></li>
                            <li><Link href="/login" className="hover:text-primary">Admin Login</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Kontak</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>sttwastukancana.humanika@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Instagram size={16} />
                                <span>@humanika_sttwastukancana</span>
                            </li>
                            {/* Placeholder address */}
                            <li>Sekolah Tinggi Teknologi Wastukancana Purwakarta</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs">
                    &copy; {new Date().getFullYear()} HUMANIKA STT Wastukancana. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};
