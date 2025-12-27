export interface OrgNodeData {
    role: string;
    name?: string;
    image?: string;
    period?: string; // Added period
    children?: OrgNodeData[];
    originalRole?: string;
    isOpen?: boolean; // For initial state if needed
}
