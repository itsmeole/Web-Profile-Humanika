import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import newsData from "@/data/news.json";
import { notFound } from "next/navigation";
import Image from "next/image";

// Use generateStaticParams for SSG if data was static, but for now standard dynamic is fine or filtered.
interface Props {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const news = newsData.find((n) => n.id === id);

    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="py-24">
                <Container className="max-w-3xl">
                    <Link href="/news">
                        <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all">
                            &larr; Kembali ke Berita
                        </Button>
                    </Link>

                    <article className="space-y-6">
                        <div className="space-y-2">
                            <span className="text-secondary font-mono">{news.date}</span>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                                {news.title}
                            </h1>
                        </div>

                        {(news as any).image && (
                            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden my-8 border border-border">
                                <Image
                                    src={(news as any).image}
                                    alt={news.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        <div className="h-px w-full bg-border my-8"></div>

                        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground">
                            {/* In a real app this would be HTML or Markdown content */}
                            <p>{news.summary}</p>
                        </div>
                    </article>
                </Container>
            </div>
            <Footer />
        </main>
    );
}
