import { Octokit } from "octokit";

// Helper to initialize Octokit with the token
// We create a new instance per request to ensure we always pick up the latest env var
const getOctokit = () => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
        throw new Error("GITHUB_TOKEN is not defined in environment variables");
    }
    return new Octokit({ auth: token });
};

interface UpdateOptions {
    owner: string;
    repo: string;
    path: string;
    message: string;
    content: any; // The JSON object to save
    branch?: string;
}

export async function updateGithubFile({ owner, repo, path, message, content, branch = "main" }: UpdateOptions) {
    const octokit = getOctokit();

    // 1. Get the current file's SHA (required for update)
    // We try to fetch the file to get its SHA.
    // If it doesn't exist, this will throw, which is fine (we might want to handle creation, but for now we assume file exists)
    let sha: string | undefined;

    try {
        const { data } = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref: branch,
        });

        if (Array.isArray(data)) {
            throw new Error(`Path ${path} is a directory, not a file`);
        }

        // @ts-ignore - The types for getContent are complex (dir vs file), but we checked isArray
        sha = data.sha;
    } catch (error: any) {
        // If file not found (404), we can proceed without SHA (creating new file)
        // But for our use case (updating structure/news), file should exist.
        if (error.status !== 404) {
            console.error("Error fetching file from GitHub:", error);
            throw error;
        }
    }

    // 2. Encode content to Base64
    const contentString = JSON.stringify(content, null, 2);
    const contentEncoded = Buffer.from(contentString).toString("base64");

    // 3. Update (or create) the file
    await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message,
        content: contentEncoded,
        sha,
        branch,
    });

    return true;
}
