"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OrgNodeData {
    role: string;
    name?: string;
    image?: string;
    children?: OrgNodeData[];
    originalRole?: string;
}

const NodeCard = ({ data }: { data: OrgNodeData }) => {
    return (
        <div className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 border border-white/10 backdrop-blur-sm shadow-xl transition-all hover:bg-white/10 hover:shadow-primary/20 hover:border-primary/50 w-64">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary/50 ring-2 ring-white/10">
                {data.image ? (
                    <Image
                        src={data.image}
                        alt={data.name || data.role}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xs">
                        No Image
                    </div>
                )}
            </div>
            <div className="text-center">
                <h3 className="font-bold text-lg text-primary leading-tight">{data.name || "Vacant"}</h3>
                <p className="text-sm font-medium text-muted-foreground mt-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/5 inline-block">
                    {data.role}
                </p>
            </div>
        </div>
    );
};

const TreeNode = ({ data }: { data: OrgNodeData }) => {
    const hasChildren = data.children && data.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            <NodeCard data={data} />

            {hasChildren && (
                <>
                    {/* Vertical Line from parent */}
                    <div className="h-8 w-px bg-border/50"></div>

                    <div className="relative flex justify-center gap-8 pt-4">
                        {/* Horizontal connector line */}
                        {data.children && data.children.length > 1 && (
                            <div className="absolute top-0 h-px bg-border/50 left-[50%] -translate-x-1/2 w-[calc(100%-16rem)] max-w-[90%]"></div>
                        )}

                        {/* Render Children */}
                        <div className="flex gap-8 flex-wrap justify-center">
                            {data.children?.map((child, idx) => (
                                <div key={idx} className="relative flex flex-col items-center">
                                    {/* Vertical line to child */}
                                    <div className="absolute -top-4 h-4 w-px bg-border/50"></div>
                                    <TreeNode data={child} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export const OrgChart = ({ data }: { data: OrgNodeData }) => {
    return (
        <div className="w-full overflow-x-auto p-8">
            <div className="min-w-max mx-auto">
                <TreeNode data={data} />
            </div>
        </div>
    );
};
