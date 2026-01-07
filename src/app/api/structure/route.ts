import { NextResponse } from "next/server";
import { updateGithubFile } from "@/lib/github";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Config for GitHub
        const owner = process.env.REPO_OWNER!;
        const repo = process.env.REPO_NAME!;
        const branch = process.env.BRANCH || "main";
        // Path relative to repo root
        const path = "src/data/structure.json";

        if (!owner || !repo) {
            throw new Error("Missing GitHub configuration (REPO_OWNER or REPO_NAME)");
        }

        await updateGithubFile({
            owner,
            repo,
            path,
            message: "Update structure.json via Admin Panel",
            content: body,
            branch
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
