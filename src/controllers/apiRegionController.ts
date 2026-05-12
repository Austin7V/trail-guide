import type { Request, Response } from "express";
import { getAllRegions, getRegionBySlug } from "../models/regionModel.ts";
import { getTrailsByRegionId } from "../models/trailModel.ts";

export async function getRegionsApi(_request: Request, response: Response) {
    const regions = await getAllRegions();
    response.status(200).json(regions);
}

export async function getRegionTrailsApi(
    request: Request<{ slug: string }>,
    response: Response,
) {
    const { slug } = request.params;

    const region = await getRegionBySlug(slug);
    if (!region) {
        response.status(404).json({ error: "Region not found" });
        return;
    }

    const trails = await getTrailsByRegionId(region.id);
    response.status(200).json({
        region,
        trails,
    });
}