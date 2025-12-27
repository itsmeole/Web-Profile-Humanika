"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrgNodeData } from "@/types/structure";

const NodeCard = ({ data, onClick, isOpen, hasChildren }: { data: OrgNodeData; onClick?: () => void; isOpen?: boolean; hasChildren: boolean }) => {
    return (
        <div
            onClick={hasChildren ? onClick : undefined}
            className={cn(
                "relative flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-3 backdrop-blur-sm shadow-lg transition-all hover:bg-white/10 w-full max-w-md mx-auto cursor-pointer group",
                hasChildren && "hover:border-primary/50"
            )}
        >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/50 ring-2 ring-white/10">
                {data.image ? (
                    <Image
                        src={data.image}
                        alt={data.name || data.role}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-[10px]">
                        No IMG
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 text-left">
                <h3 className="font-bold text-base text-primary truncate">{data.name || "Vacant"}</h3>
                <p className="text-xs font-medium text-muted-foreground bg-white/5 inline-block px-2 py-0.5 rounded-full mt-1">
                    {data.role}
                </p>
                {data.period && (
                    <p className="text-[10px] text-humanika-pink mt-0.5">{data.period}</p>
                )}
            </div>

            {hasChildren && (
                <div className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")}>
                    <ChevronDown className="text-muted-foreground group-hover:text-primary" size={20} />
                </div>
            )}
        </div>
    );
};

export const CollapsibleTree = ({ data, depth = 0 }: { data: OrgNodeData; depth?: number }) => {
    const [isOpen, setIsOpen] = useState(depth < 2); // Default open top levels
    const hasChildren = !!data.children && data.children.length > 0;

    return (
        <div className="flex flex-col items-center w-full">
            <NodeCard
                data={data}
                onClick={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
                hasChildren={hasChildren}
            />

            <AnimatePresence>
                {hasChildren && isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col items-center w-full"
                    >
                        {/* Connector Line */}
                        <div className="h-4 w-px bg-white/10 mb-2"></div>

                        <div className="flex flex-col gap-4 w-full pl-4 md:pl-8 border-l border-white/5">
                            {data.children?.map((child, idx) => (
                                <CollapsibleTree key={idx} data={child} depth={depth + 1} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
