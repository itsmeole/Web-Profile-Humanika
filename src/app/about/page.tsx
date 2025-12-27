import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="py-24">
                <Container className="space-y-12 max-w-4xl">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Tentang HUMANIKA
                        </h1>
                        <p className="text-muted-foreground">
                            Garis-Garis Besar Haluan Organisasi (GBHO)
                        </p>
                    </div>

                    <div className="space-y-8 prose prose-invert max-w-none">
                        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-2xl font-bold text-primary mb-4">A. Pendahuluan</h2>
                            <p>
                                Organisasi adalah sekelompok atau sekumpulan orang yang bekerjasama dalam suatu wadah
                                untuk mencapai tujuan yang dicita-citakan bersama. Oleh karena itu organisasi harus berdaya guna
                                dan berhasil guna untuk mencapai tujuan.
                            </p>
                            <p>
                                Garis-garis Besar Haluan Organisasi sebagai pedoman bagi aparat organisasi dalam melaksanakan
                                tugas-tugas keorganisasian perlu dirumuskan dan ditaati bersama, demikian pula dengan
                                Himpunan Mahasiswa Teknik Informatika yang merupakan wilayah kekuasaan regional
                                HUMANIKA STT Wastukancana Purwakarta.
                            </p>
                        </section>

                        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-2xl font-bold text-primary mb-4">B. Status Pengurus Himpunan</h2>
                            <p>
                                Pengurus adalah lembaga regional yang mengutamakan kegiatan pembinaan dan pelatihan
                                anggota yang berorientasi pada teknologi untuk kepentingan masyarakat dengan masa jabatan 1
                                (satu) periode sejak dilantik dan ditetapkan oleh Presiden BEM STT Wastukancana Purwakarta.
                            </p>
                        </section>

                        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-2xl font-bold text-primary mb-4">C. Tugas dan Wewenang</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Menjalankan ketetapan – ketetapan MUMAS Himpunan Mahasiswa Teknik Informatika ke- XX STT Wastukancana Purwakarta sebagai sebuah organisasi</li>
                                <li>Mempertanggung jawabkan pelaksanaan amanah organisasi pada MUMAS Himpunan Mahasiswa Teknik Informatika ke- XX STT Wastukancana Purwakarta</li>
                                <li>Melaporkan program kerja kepengurusan pada BEM STT. Wastkancana Purwakarta</li>
                            </ul>
                        </section>

                        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-2xl font-bold text-primary mb-4">D. Struktur Organisasi Pengurus</h2>
                            <p className="mb-4">Struktur Pengurus Himpunan Mahasisiwa Teknik Informatika STT Wastukancana Purwakarta meliputi:</p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <li>a. Ketua umum</li>
                                <li>b. Sekretaris umum & Wakil</li>
                                <li>c. Bendahara umum & Wakil</li>
                                <li>d. Divisi Kemahasiswaan</li>
                                <li>e. Divisi Eksternal</li>
                                <li>f. Divisi Dana Usaha</li>
                                <li>g. Divisi Minat Bakat Kesenian dan Olahraga</li>
                                <li>h. Divisi Teknologi, Informasi dan Komunikasi</li>
                            </ul>
                        </section>

                        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h2 className="text-2xl font-bold text-primary mb-4">E. Tata Kerja Struktur Organisasi (Ringkasan)</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-bold text-secondary">Ketua Umum</h3>
                                    <p>Pimpinan tertinggi HUMANIKA yang bertanggung jawab atas keseluruhan aktivitas internal maupun eksternal.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-secondary">Sekretaris Umum</h3>
                                    <p>Bertanggung jawab pada terlaksananya tertib administrasi dan kesolidasian internal.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-secondary">Bendahara Umum</h3>
                                    <p>Bertanggung jawab dalam pengelolaan keuangan HUMANIKA dan alur dana kemahasiswaan.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </Container>
            </div>
            <Footer />
        </main>
    );
}
