const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/pengurus');
const outputPath = path.join(__dirname, '../src/data/structure.json');
const dataDir = path.join(__dirname, '../src/data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Hierarchy Definition
const hierarchy = {
    role: "Ketua Himpunan",
    children: [
        {
            role: "Bendahara Umum",
            children: [
                { role: "Wakil Bendahara Umum", children: [] }
            ]
        },
        {
            role: "Sekretaris Umum",
            children: [
                { role: "Wakil Sekretaris Umum", children: [] }
            ]
        },
        // Divisions will be added here
        { role: "Ketua Divisi Tekinkom", children: [] },
        { role: "Ketua Divisi Eksternal", children: [] }, // Typos in filenames: "Ekternal"
        { role: "Ketua Divisi Kemahasiswaan", children: [] },
        { role: "Ketua Divisi MBKO", children: [] },
        { role: "Ketua Divisi Danus", children: [] }
    ]
};

// Helper to find node by role (fuzzy match)
function findNode(node, role) {
    if (node.role && node.role.toLowerCase().includes(role.toLowerCase())) return node;
    if (node.children) {
        for (let child of node.children) {
            const result = findNode(child, role);
            if (result) return result;
        }
    }
    return null;
}

// Flat list of roles mapped to generic structure buckets
const divisionMap = {
    'tekinkom': 'Ketua Divisi Tekinkom',
    'eksternal': 'Ketua Divisi Eksternal',
    'ekternal': 'Ketua Divisi Eksternal',
    'kemahasiswaan': 'Ketua Divisi Kemahasiswaan',
    'mbko': 'Ketua Divisi MBKO',
    'danus': 'Ketua Divisi Danus'
};

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    const members = [];

    files.forEach((file) => {
        if (!file.endsWith('.png')) return;

        // Format: "Role - Name.png"
        const parts = file.replace('.png', '').split('-');
        if (parts.length < 2) return;

        const roleRaw = parts[0].trim();
        const name = parts[1].trim();
        const image = `/pengurus/${file}`;

        members.push({ role: roleRaw, name, image });
    });

    // Populate Hierarchy
    // 1. Root
    const ketua = members.find(m => m.role.toLowerCase() === 'ketua himpunan');
    if (ketua) {
        hierarchy.name = ketua.name;
        hierarchy.image = ketua.image;
    }

    // 2. High Level
    const highLevelRoles = ['Bendahara Umum', 'Sekretaris Umum', 'Wakil Bendahara Umum', 'Wakil Sekretaris Umum'];
    highLevelRoles.forEach(r => {
        const mem = members.find(m => m.role.toLowerCase() === r.toLowerCase());
        const node = findNode(hierarchy, r);
        if (mem && node) {
            node.name = mem.name;
            node.image = mem.image;
        }
    });

    // 3. Divisions
    // Strategy: Find Division Heads first, then append members to them
    members.forEach(mem => {
        const roleLower = mem.role.toLowerCase();

        // Skip if handled
        if (roleLower === 'ketua himpunan' || highLevelRoles.some(r => r.toLowerCase() === roleLower)) return;

        // Identification
        let divisionKey = null;
        for (const key in divisionMap) {
            if (roleLower.includes(key)) {
                divisionKey = key;
                break;
            }
        }

        if (divisionKey) {
            const headRole = divisionMap[divisionKey];
            const headNode = findNode(hierarchy, headRole); // Find the Ketua of that division

            if (roleLower.includes('ketua divisi')) {
                // It is the head
                if (headNode) {
                    headNode.name = mem.name;
                    headNode.image = mem.image;
                    headNode.originalRole = mem.role;
                }
            } else {
                // It is a member/secretary/bendahara of the division
                if (headNode) {
                    if (!headNode.children) headNode.children = [];
                    headNode.children.push({
                        role: mem.role,
                        name: mem.name,
                        image: mem.image,
                        children: []
                    });
                }
            }
        }
    });

    fs.writeFileSync(outputPath, JSON.stringify(hierarchy, null, 2));
    console.log("Structure generated at " + outputPath);
});
