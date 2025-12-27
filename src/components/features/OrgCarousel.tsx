"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import { cn } from "@/lib/utils";
import { OrgNodeData } from "@/types/structure";
import roleDescriptions from "@/data/roleDescriptions.json";

// Helper to map role names to description keys
const getJobDescKey = (role: string) => {
    if (role.includes("Ketua Himpunan")) return "Ketua Umum";
    if (role.includes("Sekretaris Umum")) return "Sekretaris Umum";
    if (role.includes("Bendahara Umum")) return "Bendahara Umum";
    // Check for "Divisi" for both head and staff
    if (role.toLowerCase().includes("tekinkom")) return "Divisi Teknologi, Informasi & Komunikasi";
    if (role.toLowerCase().includes("eksternal")) return "Divisi Eksternal";
    if (role.toLowerCase().includes("kemahasiswaan")) return "Divisi Kemahasiswaan";
    if (role.toLowerCase().includes("mbko") || role.toLowerCase().includes("kesenian") || role.toLowerCase().includes("minat bakat")) return "Divisi Minat Bakat Kesenian dan Olahraga";
    if (role.toLowerCase().includes("danus") || role.toLowerCase().includes("dana usaha")) return "Divisi Dana Usaha";

    // Fallback for general members if they have specific roles handled in JSON, otherwise they might fall into division keys above
    return "";
};

// Flatten the tree to get only Leaders
const getLeaders = (root: OrgNodeData) => {
    const leaders = [root]; // Ketua
    if (root.children) {
        leaders.push(...root.children); // Sekum, Bendum, Divisi Leaders
    }
    return leaders;
};

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
    Math.min(Math.max(number, min), max)

export const OrgCarousel = ({ data }: { data: OrgNodeData }) => {
    const leaders = getLeaders(data);
    const [selectedLeader, setSelectedLeader] = useState<OrgNodeData | null>(null);
    const [history, setHistory] = useState<OrgNodeData[]>([]);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center", skipSnaps: false },
        [Autoplay({ delay: 3000, stopOnMouseEnter: true, stopOnInteraction: false })]
    );
    const [tweenValues, setTweenValues] = useState<number[]>([]);

    // Tween logic: 0 to 1 based on proximity to center
    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()
        const slidesInView = emblaApi.slidesInView()
        const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
            let diffToTarget = scrollSnap - scrollProgress
            const slidesInSnap = engine.slideRegistry[index]
            slidesInSnap.forEach((slideIndex) => {
                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target()
                        if (index === loopItem.index && target !== 0) {
                            const sign = Math.sign(target)
                            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
                            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
                        }
                    })
                }
            })
            // Calculate proximity (0 = far, 1 = center)
            return numberWithinRange(1 - Math.abs(diffToTarget * TWEEN_FACTOR_BASE), 0, 1)
        })
        setTweenValues(styles)
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onScroll(emblaApi)
        emblaApi.on('reInit', onScroll)
        emblaApi.on('scroll', onScroll)
    }, [emblaApi, onScroll])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const handleLeaderClick = (leader: OrgNodeData) => {
        setSelectedLeader(leader);
        setHistory([]); // Reset history when opening a new leader from carousel
    };

    const handleMemberClick = (member: OrgNodeData) => {
        if (selectedLeader) {
            setHistory((prev) => [...prev, selectedLeader]);
        }
        setSelectedLeader(member);
    };

    const handleBack = () => {
        if (history.length > 0) {
            const prev = history[history.length - 1];
            setSelectedLeader(prev);
            setHistory((old) => old.slice(0, -1));
        }
    };

    return (
        <div className="relative w-full py-16 flex flex-col items-center justify-center">

            {/* Embla Viewport - Full Width */}
            <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex touch-pan-y -ml-10">
                    {leaders.map((leader, index) => {
                        const tweenVal = tweenValues[index] || 0;
                        const isFocused = tweenVal > 0.85; // Lower threshold to ensure center is active

                        return (
                            <div
                                key={`${leader.role}-${index}`}
                                className="flex-[0_0_70%] min-w-0 pl-10 sm:flex-[0_0_35%] md:flex-[0_0_20%] relative py-8"
                            >
                                <motion.div
                                    className="relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                                    style={{
                                        transform: `scale(${0.8 + (0.3 * tweenVal)})`, // 0.8 to 1.1
                                        opacity: Math.max(0.3, tweenVal),
                                        zIndex: Math.round(tweenVal * 100),
                                        filter: isFocused ? 'blur(0px)' : 'blur(2px)'
                                    }}
                                    onClick={() => handleLeaderClick(leader)}
                                >
                                    <div className={cn(
                                        "relative overflow-hidden rounded-3xl transition-all duration-300 h-[450px] shadow-2xl",
                                        isFocused ? "bg-white/5 shadow-humanika-pink/10" : "bg-white/0 grayscale hover:grayscale-0"
                                    )}>
                                        <div className="absolute inset-0">
                                            {/* Parallax Image Effect container */}
                                            <div className="relative w-full h-full">
                                                {leader.image ? (
                                                    <Image
                                                        src={leader.image}
                                                        alt={leader.role}
                                                        fill
                                                        quality={100}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground"><User size={64} /></div>
                                                )}
                                            </div>
                                            {/* Text Background Overlay - Enhanced for readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent opacity-90"></div>
                                        </div>
                                        <div className="absolute bottom-0 p-8 text-left w-full translate-y-2 group-hover:translate-y-0 transition-transform">
                                            <h3 className="text-3xl font-bold text-white leading-tight mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{leader.name || "Vacant"}</h3>
                                            <div className="inline-block px-3 py-1.5 bg-humanika-pink text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                {leader.role.replace("Ketua Divisi", "KADIV").replace("Ketua Himpunan", "KAHIM")}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-6 mt-8 z-20">
                <button onClick={scrollPrev} className="p-4 rounded-full bg-black/50 border border-white/10 hover:bg-humanika-pink hover:border-humanika-pink hover:scale-110 transition-all backdrop-blur-sm group">
                    <ChevronLeft className="text-white group-hover:text-white" size={28} />
                </button>
                <button onClick={scrollNext} className="p-4 rounded-full bg-black/50 border border-white/10 hover:bg-humanika-pink hover:border-humanika-pink hover:scale-110 transition-all backdrop-blur-sm group">
                    <ChevronRight className="text-white group-hover:text-white" size={28} />
                </button>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedLeader && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
                        onClick={() => setSelectedLeader(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="bg-[#0f172a] border border-white/10 w-full max-w-7xl h-[90vh] rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Left: Profile */}
                            <div className="relative w-full md:w-[400px] h-80 md:h-full shrink-0 group">
                                {selectedLeader.image ? (
                                    <Image src={selectedLeader.image} alt={selectedLeader.name || ""} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : <div className="w-full h-full bg-muted" />}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0f172a]/90"></div>
                                <div className="absolute bottom-8 left-8 right-8 z-10">
                                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tight">{selectedLeader.name}</h2>
                                    <p className="text-white text-xl md:text-2xl font-bold tracking-wide">{selectedLeader.role}</p>
                                </div>
                                <div className="absolute top-6 left-6 z-20 flex gap-2">
                                    {history.length > 0 && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleBack(); }}
                                            className="p-3 bg-black/50 hover:bg-humanika-pink rounded-full text-white transition-colors flex items-center gap-2 px-4 shadow-lg backdrop-blur-md"
                                        >
                                            <ChevronLeft size={20} /> <span className="text-sm font-bold">Kembali</span>
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => setSelectedLeader(null)}
                                    className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-humanika-pink rounded-full text-white md:hidden transition-colors z-20"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Right: Details (Scrollable) */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#0f172a]">
                                <div className="p-8 md:p-12 space-y-12">
                                    <button
                                        onClick={() => setSelectedLeader(null)}
                                        className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 hover:text-white rounded-full text-zinc-400 hidden md:flex transition-all z-20 scale-100 hover:scale-110"
                                    >
                                        <X size={24} />
                                    </button>

                                    {/* Job Description */}
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                                        <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                            <div className="h-10 w-1.5 bg-gradient-to-b from-humanika-pink to-purple-600 rounded-full"></div>
                                            Tugas & Wewenang
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-3 font-bold text-humanika-blue text-sm tracking-widest uppercase border-b border-white/10 pb-2">
                                                    <span className="w-2 h-2 rounded-full bg-humanika-blue"></span>
                                                    Tugas Pokok
                                                </h4>
                                                <ul className="space-y-4">
                                                    {(roleDescriptions as any)[getJobDescKey(selectedLeader.role)]?.tugas?.map((t: string, i: number) => (
                                                        <li key={i} className="text-zinc-300 leading-relaxed flex items-start gap-3">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                                                            {t}
                                                        </li>
                                                    )) || <li className="text-zinc-500 italic">Tidak ada data tugas spesifik.</li>}
                                                </ul>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="flex items-center gap-3 font-bold text-humanika-blue text-sm tracking-widest uppercase border-b border-white/10 pb-2">
                                                    <span className="w-2 h-2 rounded-full bg-humanika-blue"></span>
                                                    Fungsi
                                                </h4>
                                                <ul className="space-y-4">
                                                    {(roleDescriptions as any)[getJobDescKey(selectedLeader.role)]?.fungsi?.map((t: string, i: number) => (
                                                        <li key={i} className="text-zinc-300 leading-relaxed flex items-start gap-3">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                                                            {t}
                                                        </li>
                                                    )) || <li className="text-zinc-500 italic">Tidak ada data fungsi spesifik.</li>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Members / Hierarchy */}
                                    {(selectedLeader.children && selectedLeader.children.length > 0) && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10"></div>
                                            <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                                <div className="h-10 w-1.5 bg-gradient-to-b from-humanika-blue to-cyan-500 rounded-full"></div>
                                                Anggota Tim <span className="text-zinc-500 text-lg font-normal ml-2">({selectedLeader.children.length})</span>
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                                {selectedLeader.children.map((child, i) => (
                                                    <div
                                                        key={i}
                                                        onClick={() => handleMemberClick(child)}
                                                        className="group flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-humanika-pink/50 hover:bg-white/[0.07] transition-all hover:shadow-lg hover:shadow-humanika-pink/5 hover:-translate-y-1 cursor-pointer"
                                                    >
                                                        <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white/10 shrink-0 group-hover:border-humanika-pink transition-colors shadow-lg">
                                                            {child.image ? (
                                                                <Image src={child.image} alt={child.name || ""} fill className="object-cover" />
                                                            ) : <div className="w-full h-full bg-muted flex items-center justify-center"><User size={32} className="text-zinc-500" /></div>}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h5 className="font-bold text-white text-lg truncate mb-1 group-hover:text-humanika-pink transition-colors">{child.name || "Vacant"}</h5>
                                                            <p className="text-sm text-zinc-400 font-medium truncate">{child.role}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
