import { getDB} from "./db";

export interface Trail {
    id: number;
    title: string;
    slug: string;
    description: string;
    difficulty: string;
    distance_km: number;
    region_id: number;
    created_at: string;
    region_name: string;
    region_country: string;
}

const trailSelectWithRegion = `
  SELECT
    trails.id,
    trails.title,
    trails.slug,
    trails.description,
    trails.difficulty,
    trails.distance_km,
    trails.region_id,
    trails.created_at,
    regions.name AS region_name,
    regions.country AS region_country
  FROM trails
  INNER JOIN regions ON trails.region_id = regions.id`;

export async function getAllTrails(): Promise<Trail[]> {
    const db = getDB();
    return db.all<Trail[]>(
        `${trailSelectWithRegion}
        ORDER BY trails.created_at DESC`,
    );
}

export async function getTrailBySlug(
    slug: string,): Promise<Trail | undefined> {
    const db = getDB();
    return db.get<Trail>(
        `${trailSelectWithRegion}
        WHERE trails.slug = ?`, slug,
    );
}


export async function getTrailsByRegionId(regionId: number): Promise<Trail[]> {
    const db = getDB();
    return db.all<Trail[]>(
        `${trailSelectWithRegion}
    WHERE trails.region_id = ?
    ORDER BY trails.created_at DESC`,
        regionId,
    );
}