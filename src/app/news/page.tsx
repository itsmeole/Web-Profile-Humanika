import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import newsData from "@/data/news.json";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function NewsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="py-24">
                <Container>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-12">
                        Berita & Kegiatan
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsData.map((news) => (
                            <div key={news.id} className="group flex flex-col rounded-xl glass-card hover:border-primary/50 hover:bg-white/10 dark:hover:bg-white/10 transition-all overflow-hidden h-full">
                                <div className="h-48 w-full bg-muted/20 relative overflow-hidden">
                                    {(news as any).image ? (
                                        <Image
                                            src={(news as any).image}
                                            alt={news.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-neutral-800" />
                                    )}
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <span className="text-xs text-secondary font-mono mb-2 block">{news.date}</span>
                                        <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {news.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm line-clamp-3">
                                            {news.summary}
                                        </p>
                                    </div>
                                    <div className="mt-6">
                                        <Link href={`/news/${news.id}`}>
                                            <Button variant="ghost" className="p-0 hover:bg-transparent hover:text-secondary">
                                                Baca Selengkapnya &rarr;
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
            <Footer />
        </main>
    );
}
