import { NextResponse } from "next/server";
import { updateGithubFile } from "@/lib/github";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Config for GitHub
        const owner = process.env.REPO_OWNER;
        const repo = process.env.REPO_NAME;
        const branch = process.env.BRANCH || "main";
        // Path relative to repo root
        const path = "src/data/structure.json";

        // Hybrid Strategy:
        // 1. If GitHub Config exists -> Use GitHub
        // 2. If Dev Mode & No GitHub -> Use Local FS (Legacy)
        // 3. Otherwise -> Throw Error
        if (owner && repo && process.env.GITHUB_TOKEN) {
            await updateGithubFile({
                owner,
                repo,
                path,
                message: "Update structure.json via Admin Panel",
                content: body,
                branch
            });
        } else if (process.env.NODE_ENV === "development") {
            // Fallback to local FS for dev without internet/tokens
            const fs = require("fs/promises");
            const localPath = require("path").join(process.cwd(), path);
            await fs.writeFile(localPath, JSON.stringify(body, null, 2));
        } else {
            const missing = [];
            if (!owner) missing.push("REPO_OWNER");
            if (!repo) missing.push("REPO_NAME");
            if (!process.env.GITHUB_TOKEN) missing.push("GITHUB_TOKEN");

            throw new Error(`Missing GitHub configuration: ${missing.join(", ")}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
