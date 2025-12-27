"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, GripVertical, ChevronRight, ChevronDown, Upload } from "lucide-react";

// Types
interface News {
    id: string;
    title: string;
    date: string;
    summary: string;
    content: string;
    image?: string; // Added image support
}

interface StructureNode {
    role: string;
    name?: string;
    image?: string;
    period?: string;
    children?: StructureNode[];
}

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState<"news" | "structure">("news");
    const [news, setNews] = useState<News[]>([]);
    const [structure, setStructure] = useState<StructureNode | null>(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const auth = document.cookie.includes("auth=true");
        if (!auth) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
            loadData();
        }
    }, [router]);

    const loadData = async () => {
        // In a real app, use fetch API. Here we rely on imported json for init state, but updates need to persist locally via API.
        const resNews = await import("@/data/news.json");
        setNews((resNews as any).default || resNews);

        const resStruct = await import("@/data/structure.json");
        setStructure((resStruct as any).default || resStruct);
    };

    const handleSave = async (type: "news" | "structure") => {
        setStatus(`Saving ${type}...`);
        const body = type === "news" ? news : structure;
        const res = await fetch(`/api/${type}`, {
            method: "POST",
            body: JSON.stringify(body),
        });
        if (res.ok) {
            setStatus("Saved successfully!");
            setTimeout(() => setStatus(""), 2000);
        } else {
            setStatus("Error saving.");
        }
    };

    // Helper Component for Image Upload
    const ImageUploader = ({ value, onChange, placeholder = "Image URL", className }: { value: string, onChange: (val: string) => void, placeholder?: string, className?: string }) => {
        const [uploading, setUploading] = useState(false);

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                if (data.success) {
                    onChange(data.url);
                } else {
                    alert("Upload failed: " + data.message);
                }
            } catch (err) {
                console.error(err);
                alert("Upload error");
            } finally {
                setUploading(false);
            }
        };

        return (
            <div className={`flex gap-2 items-center ${className}`}>
                <input
                    className="flex-1 bg-black/20 border border-white/10 p-1.5 rounded text-xs text-muted-foreground truncate"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                <label className={`cursor-pointer bg-white/5 hover:bg-white/10 p-1.5 rounded border border-white/10 text-white/70 transition-colors flex items-center justify-center ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
                    {uploading ? <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-humanika-pink animate-spin" /> : <Upload size={14} />}
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
                </label>
            </div>
        );
    };

    // --- Recursive Structure Editor ---
    const StructureEditor = ({ node, onChange, onDelete, path = [] }: { node: StructureNode, onChange: (n: StructureNode) => void, onDelete?: () => void, path?: number[] }) => {
        const [isOpen, setIsOpen] = useState(true);

        const updateField = (field: keyof StructureNode, value: any) => {
            onChange({ ...node, [field]: value });
        };

        const updateChild = (index: number, newChild: StructureNode) => {
            const newChildren = [...(node.children || [])];
            newChildren[index] = newChild;
            onChange({ ...node, children: newChildren });
        };

        const addChild = () => {
            const newChildren = [...(node.children || []), { role: "New Role", name: "New Name", children: [] }];
            onChange({ ...node, children: newChildren });
        };

        const removeChild = (index: number) => {
            const newChildren = [...(node.children || [])];
            newChildren.splice(index, 1);
            onChange({ ...node, children: newChildren });
        };

        return (
            <div className="ml-4 border-l border-white/10 pl-4 py-2">
                <div className="flex items-center gap-1 mb-1">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-white/10 rounded">
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    <input
                        className="bg-black/20 border border-white/10 p-1.5 rounded text-sm text-humanika-pink font-bold w-32 md:w-48"
                        value={node.role} onChange={(e) => updateField("role", e.target.value)} placeholder="Role"
                    />
                    <input
                        className="bg-black/20 border border-white/10 p-1.5 rounded text-sm text-white w-28 md:w-143"
                        value={node.name || ""} onChange={(e) => updateField("name", e.target.value)} placeholder="Name"
                    />

                    <input
                        className="bg-black/20 border border-white/10 p-1.5 rounded text-xs text-muted-foreground w-16"
                        value={node.period || ""} onChange={(e) => updateField("period", e.target.value)} placeholder="Period"
                    />
                    {/* Replaced with ImageUploader */}
                    <ImageUploader
                        value={node.image || ""}
                        onChange={(val) => updateField("image", val)}
                        placeholder="Image..."
                        className="w-32"
                    />

                    {onDelete && (
                        <button onClick={onDelete} className="ml-auto p-1 text-destructive hover:bg-destructive/10 rounded shrink-0">
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                {isOpen && (
                    <div className="space-y-2">
                        {node.children?.map((child, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <div className="min-w-0 w-full">
                                    <StructureEditor
                                        node={child}
                                        onChange={(n) => updateChild(idx, n)}
                                        onDelete={() => removeChild(idx)}
                                        path={[...path, idx]}
                                    />
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" size="sm" onClick={addChild} className="ml-8 text-xs h-8 text-muted-foreground dashed border border-white/10">
                            <Plus size={14} className="mr-1" /> Add Child to {node.role}
                        </Button>
                    </div>
                )}
            </div>
        );
    };


    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <Navbar />
            <div className="py-12">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-humanika-blue to-humanika-pink bg-clip-text text-transparent">
                                HUMANIKA Admin
                            </h1>
                            <p className="text-muted-foreground text-sm">Dashboard Pengurusan Web</p>
                        </div>

                        <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                            <button
                                onClick={() => setActiveTab("news")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'news' ? 'bg-humanika-pink text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                            >
                                Berita
                            </button>
                            <button
                                onClick={() => setActiveTab("structure")}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'structure' ? 'bg-humanika-pink text-white shadow-lg' : 'text-muted-foreground hover:text-white'}`}
                            >
                                Struktur
                            </button>
                        </div>
                    </div>

                    {status && (
                        <div className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom">
                            {status}
                        </div>
                    )}

                    {activeTab === "news" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex justify-end gap-4">
                                <Button onClick={() => setNews([...news, { id: Date.now().toString(), title: "New", date: new Date().toISOString().split('T')[0], summary: "", content: "" }])}>
                                    <Plus size={16} className="mr-2" /> Tambah Berita
                                </Button>
                                <Button variant="premium" onClick={() => handleSave("news")}>Simpan Perubahan</Button>
                            </div>

                            <div className="grid gap-6">
                                {news.map((item, idx) => (
                                    <div key={item.id} className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4 hover:border-humanika-pink/30 transition-colors">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold text-lg text-white">#{idx + 1}</h3>
                                            <button onClick={() => setNews(news.filter(n => n.id !== item.id))} className="text-destructive hover:bg-destructive/10 p-2 rounded">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Judul</label>
                                                <input
                                                    className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white focus:border-humanika-pink outline-none transition-colors"
                                                    value={item.title} onChange={(e) => {
                                                        const n = [...news]; n[idx].title = e.target.value; setNews(n);
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Tanggal</label>
                                                <input
                                                    type="date"
                                                    className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white focus:border-humanika-pink outline-none transition-colors"
                                                    value={item.date} onChange={(e) => {
                                                        const n = [...news]; n[idx].date = e.target.value; setNews(n);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Image URL / Upload</label>
                                            <ImageUploader
                                                value={item.image || ""}
                                                onChange={(val) => {
                                                    const n = [...news]; n[idx].image = val; setNews(n);
                                                }}
                                                placeholder="/path/to/image.jpg"
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Ringkasan</label>
                                            <textarea
                                                className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white focus:border-humanika-pink outline-none transition-colors min-h-[80px]"
                                                value={item.summary} onChange={(e) => {
                                                    const n = [...news]; n[idx].summary = e.target.value; setNews(n);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "structure" && structure && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Editor Struktur</h2>
                                    <p className="text-xs text-muted-foreground">Edit seluruh node, atau tambah anggota baru.</p>
                                </div>
                                <Button variant="premium" onClick={() => handleSave("structure")}>Simpan Perubahan</Button>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 overflow-x-auto">
                                <StructureEditor node={structure} onChange={setStructure} />
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
}


