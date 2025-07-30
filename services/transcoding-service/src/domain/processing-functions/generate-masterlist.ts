import fs from 'fs';
import path from 'path';
interface Tier {
	vr: number;
	br: number; //In kbps
}

export function generateMasterList(currentMediaPath: string, tiers: Tier[]) {
    const fileContent = ['#EXTM3U', '\n'];
    
    for (const tier of tiers) {
        const horizontalRes = Math.floor(tier.vr * (16 / 9))
        const variantHeader = `#EXT-X-STREAM-INF:BANDWIDTH=${tier.br * 1000},RESOLUTION=${horizontalRes}x${tier.vr},CODECS="avc1.42e01e,mp4a.40.2"`;
        const listName = `${tier.vr}p.m3u8`

        fileContent.push(variantHeader)
        fileContent.push(listName)    
    }

    const masterDestination = path.join(currentMediaPath, 'master.m3u8')
    fs.writeFileSync(masterDestination, fileContent.join("\n"))
}
