import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrgChart } from "@/components/features/OrgChart";
// Fetch data server side (file read) or import
import structureData from "@/data/structure.json";

export default function StructurePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="py-12 md:py-24 space-y-8">
                <Container>
                    <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Struktur Organisasi
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Susunan kepengurusan HUMANIKA Periode 2024-2025.
                        </p>
                    </div>
                </Container>

                {/* Full width container for the chart */}
                <div className="w-full bg-black/20 border-y border-white/5 py-12">
                    <OrgChart data={structureData} />
                </div>
            </div>
            <Footer />
        </main>
    );
}
