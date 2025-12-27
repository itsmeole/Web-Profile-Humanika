import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { OrgCarousel } from "@/components/features/OrgCarousel";
import structureData from "@/data/structure.json";
import newsData from "@/data/news.json";
import { OrgNodeData } from "@/types/structure";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground scroll-smooth">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/foto-bersama.png"
            alt="Foto Bersama Pengurus"
            fill
            className="object-cover opacity-85 blur-[3px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <Container className="relative z-10 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="inline-flex items-center rounded-full border border-humanika-pink/20 bg-humanika-pink/10 px-4 py-1.5 text-sm font-medium text-humanika-pink backdrop-blur-md shadow-inner shadow-humanika-pink/20 animate-pulse">
            Periode 2025 - 2026
          </div>

          <h1 className="max-w-5xl text-5xl font-extrabold tracking-tight bg-gradient-to-r from-humanika-blue via-pink-500 to-humanika-pink bg-clip-text text-transparent md:text-7xl lg:text-8xl pb-2">
            HUMANIKA
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl drop-shadow-md">
            Himpunan Mahasiswa Teknik Informatika STT Wastukancana Purwakarta.
            "Low Profile and No Talk Only".
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="#about">
              <Button variant="premium" size="lg" className="min-w-[160px] text-lg h-12 rounded-full">
                Tentang Kami
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* About / GBHO Section */}
      <section id="about" className="py-24 bg-background relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-humanika-blue/5 via-transparent to-transparent pointer-events-none"></div>
        <Container className="space-y-16 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">Tentang Kami</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-humanika-blue to-humanika-pink mx-auto rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Garis-Garis Besar Haluan Organisasi (GBHO) sebagai pedoman langkah juang Himpunan.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Left Column: Scrollable Text Content */}
            <div className="flex-1 space-y-8 min-w-0">

              {/* Makna Lambang (New) */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 hover:border-humanika-pink/50 hover:shadow-2xl hover:shadow-humanika-pink/10 transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-humanika-blue mb-4 group-hover:text-humanika-pink transition-colors">Makna Lambang</h3>
                <ol className="list-[lower-alpha] pl-5 space-y-3 text-muted-foreground leading-relaxed">
                  <li><span className="text-white font-medium">Lingkaran panah berwarna hijau berjumlah empat:</span> bermakna kesinambungan dan kekompakan yang tak pernah habis / putus.</li>
                  <li><span className="text-white font-medium">Roda gigi berwarna biru berjumlah enam belas:</span> bermakna ilmu pengetahuan dan teknologi.</li>
                  <li><span className="text-white font-medium">Perisai berwarna merah dan putih:</span> bermakna prinsip perjuangan bangsa Indonesia.</li>
                  <li><span className="text-white font-medium">Huruf IF (Informatika) berwarna emas:</span> bermakna kejayaan teknologi informasi menguasai dunia.</li>
                  <li><span className="text-white font-medium">Bendera berkibar berwarna biru bertulis “HUMANIKA”:</span> bermakna Himpunan Mahasiswa Teknik Informatika tetap eksis untuk kebenaran dan kejayaan almamater.</li>
                </ol>
              </div>

              {/* Slogan */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 hover:border-humanika-pink/50 hover:shadow-2xl hover:shadow-humanika-pink/10 transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-humanika-blue mb-4 group-hover:text-humanika-pink transition-colors uppercase tracking-widest">Slogan</h3>
                <p className="text-2xl font-serif italic text-white leading-relaxed">
                  "Perempuan Berdaya, informatika berkarya, dari akademik untuk aksi, dari perempuan untuk perubahan"
                </p>
              </div>

              {/* Visi & Misi */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 hover:border-humanika-pink/50 hover:shadow-2xl hover:shadow-humanika-pink/10 transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-humanika-blue mb-4 group-hover:text-humanika-pink transition-colors">Visi & Misi</h3>

                <div className="mb-8">
                  <h4 className="text-lg font-bold text-white mb-2">Visi</h4>
                  <p className="text-muted-foreground leading-relaxed text-lg italic">
                    "Humanika menjadi rumah mahasiswa Teknik Informatika yang unggul dalam prestasi akademik, inovasi ideologi, serta menjadi ruang perjuangan untuk semua mahasiswa dan pemberdayaan perempuan untuk berdaya, setara."
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Misi</h4>
                  <ol className="list-decimal pl-5 space-y-3 text-muted-foreground leading-relaxed">
                    <li>Meningkatkan kualitas akademik melalui forum belajar bersama, riset kolaboratif, dan kompetisi teknologi.</li>
                    <li>Menjalin kerja sama dengan industri dan alumni untuk memperluas peluang magang, riset, dan karier.</li>
                    <li>Menyuarakan kesetaraan gender di lingkungan kampus, khususnya dalam bidang akademik dan organisasi.</li>
                    <li>Memberikan ruang aman, dukungan, dan pelatihan soft skill bagi seluruh mahasiswa agar mampu bersaing di dunia teknologi.</li>
                    <li>Menumbuhkan solidaritas dan kebersamaan antaranggota melalui kegiatan sosial, kewirausahaan, dan pengabdian masyarakat.</li>
                    <li>Membangun sistem kepemimpinan yang transparan, kolaboratif, dan berorientasi pada keberlanjutan organisasi.</li>
                    <li>Menjadikan organisasi sebagai rumah aspirasi mahasiswa teknik informatika yang inklusif dan progresif.</li>
                  </ol>
                </div>
              </div>

              {/* Tugas & Wewenang (Stacked) */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 hover:border-humanika-pink/50 hover:shadow-2xl hover:shadow-humanika-pink/10 transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-humanika-blue mb-4 group-hover:text-humanika-pink transition-colors">Tugas & Wewenang</h3>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed">
                  <li>Menjalankan ketetapan – ketetapan MUMAS Himpunan Mahasiswa Teknik Informatika ke- XX STT Wastukancana Purwakarta sebagai sebuah organisasi</li>
                  <li>Mempertanggung jawabkan pelaksanaan amanah organisasi pada MUMAS Himpunan Mahasiswa Teknik Informatika ke- XX STT Wastukancana Purwakarta</li>
                  <li>Melaporkan program kerja kepengurusan pada BEM STT. Wastkancana Purwakarta</li>
                </ul>
              </div>

              {/* Status Pengurus (Stacked) */}
              <div className="group rounded-2xl bg-white/5 border border-white/10 hover:border-humanika-pink/50 hover:shadow-2xl hover:shadow-humanika-pink/10 transition-all duration-300 p-8">
                <h3 className="text-2xl font-bold text-humanika-blue mb-4 group-hover:text-humanika-pink transition-colors">Status Pengurus</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pengurus adalah lembaga regional yang mengutamakan kegiatan pembinaan dan pelatihan anggota yang berorientasi pada teknologi untuk kepentingan masyarakat dengan masa jabatan 1 (satu) periode sejak dilantik dan ditetapkan oleh Presiden BEM STT Wastukancana Purwakarta, dalam keadaan tertentu jika Pengurus HUMANIKA tidak ada yang melantik maka yang melantik adalah Ketua Program Studi / Sekretaris Program Study atau jika diperlukan dapat dilantik langsung oleh Ketua STT Wastukancana Purwakarta
                </p>
              </div>
            </div>

            {/* Right Column: Static Logo + Sticky Image */}
            <div className="lg:w-[600px] shrink-0 flex flex-col gap-12">
              {/* Logo Himpunan (Static/Scrollable) */}
              <div className="flex justify-center items-center py-8">
                <div className="relative w-64 h-64 transition-transform duration-500 hover:scale-105 drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                  <Image src="/logo-himpunan.png" alt="Logo HUMANIKA" fill className="object-contain" />
                </div>
              </div>

              {/* Group Photo (Sticky) */}
              <div className="relative lg:sticky lg:top-32 h-[600px] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl group">
                <Image
                  src="/pengurus-group-v2.png"
                  alt="Foto Pengurus HUMANIKA"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-white font-bold text-lg">Kabinet 2025-2026</p>
                  <p className="text-white text-sm">Mengabdi Bersama Membangun Karakter Mahasiswa Yang Inovatif</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Structure Section */}
      <section id="structure" className="py-24 bg-black/20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-humanika-pink/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-humanika-blue/10 rounded-full blur-3xl pointer-events-none"></div>

        <Container>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-white">Struktur Organisasi</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-humanika-pink to-humanika-blue mx-auto rounded-full"></div>
            <p className="text-muted-foreground">
              Susunan kepengurusan periode 2025-2026.
            </p>
          </div>
        </Container>

        {/* Full Width Carousel without Container limitation */}
        <div className="w-full">
          <OrgCarousel data={structureData as OrgNodeData} />
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-background">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">Berita & Kegiatan</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-humanika-blue to-humanika-pink rounded-full"></div>
            </div>
            <Link href="/news" className="hidden md:block">
              <Button variant="outline" className="rounded-full">Lihat Semua Berita</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((news) => (
              <div key={news.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-humanika-pink/50 hover:shadow-2xl hover:shadow-humanika-pink/10 transition-all duration-300">
                <div className="h-48 w-full bg-muted/20 relative overflow-hidden">
                  {/* News Image */}
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

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-2 py-1 text-[10px] font-bold bg-humanika-pink text-white rounded uppercase tracking-wider">Berita</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-humanika-blue font-mono mb-2 block">{news.date}</span>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-humanika-pink transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                    {news.summary}
                  </p>
                  <Link href={`/news/${news.id}`} className="mt-auto">
                    <span className="text-sm font-medium text-white group-hover:text-humanika-pink flex items-center gap-2 transition-colors">
                      Baca Selengkapnya <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/news">
              <Button variant="outline" className="rounded-full w-full">Lihat Semua Berita</Button>
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
