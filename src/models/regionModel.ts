import { getDB } from "./db";

export interface Region {
    id: number;
    name: string;
    slug: string;
    country: string;
}

export async function getAllRegions(): Promise<Region[]> {
    const db = getDB();

    return db.all<Region[]>(
        `SELECT id, name, slug, country
    FROM regions 
    ORDER BY name ASC`,
    );
}

export async function getRegionBySlug(slug: string): Promise<Region | undefined> {
    const db = getDB();
    return db.get<Region>(
        `SELECT id, name, slug, country
        FROM regions
        WHERE slug = ?`,
        slug,
    );
}