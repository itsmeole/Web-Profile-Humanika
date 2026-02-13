import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename
        const filename = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;

        // Config for GitHub
        const owner = process.env.REPO_OWNER;
        const repo = process.env.REPO_NAME;
        const branch = process.env.BRANCH || "main";
        // Path in repo
        const repoPath = `public/uploads/${filename}`;

        // Hybrid Strategy
        if (owner && repo && process.env.GITHUB_TOKEN) {
            // Upload to GitHub
            const { updateGithubFile } = require("@/lib/github");
            await updateGithubFile({
                owner,
                repo,
                path: repoPath,
                message: `Upload image ${filename}`,
                content: buffer,
                branch,
                isBinary: true
            });

            // Use Raw URL for immediate availability (avoiding Vercel build delay)
            // Limitation: might be slow or cached, but better than 404
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/public/uploads/${filename}`;
            return NextResponse.json({ success: true, url: rawUrl });

        } else if (process.env.NODE_ENV === "development") {
            // Local Fallback
            const uploadDir = path.join(process.cwd(), "public/uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filepath = path.join(uploadDir, filename);
            await writeFile(filepath, buffer);

            return NextResponse.json({ success: true, url: `/uploads/${filename}` });
        } else {
            const missing = [];
            if (!owner) missing.push("REPO_OWNER");
            if (!repo) missing.push("REPO_NAME");
            if (!process.env.GITHUB_TOKEN) missing.push("GITHUB_TOKEN");
            throw new Error(`Missing GitHub configuration for upload: ${missing.join(", ")}`);
        }

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
    }
}
