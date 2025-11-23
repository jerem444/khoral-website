import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export type ImageData = {
    url: string;
    alt: string;
    name: string;
};

export async function GET() {
    const imagesDir = path.join(process.cwd(), 'public/src/assets/images/portfolio');
    const files = fs.readdirSync(imagesDir);

    const imageData = files.map((file) => ({
        url: `/src/assets/images/portfolio/${file}`,
        alt: file,
        name: `${file.split('_')[0]} - ${file.split('_')[1]}`, // Récupère le nom du fichier sans extension
    }));

    return NextResponse.json(imageData);
}