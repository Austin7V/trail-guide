import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug } from "../models/trailModel.ts";

export async function getTrailsApi(_request: Request, response: Response) {
    const trails = await getAllTrails();

    response.status(200).json(trails);
}

export async function getTrailBySlugApi(
    request: Request<{ slug: string }>,
    response: Response,
) {
    const { slug } = request.params;

    const trail = await getTrailBySlug(slug);

    if (!trail) {
        response.status(404).json({ error: "Trail not found" });
        return;
    }
    response.status(200).json(trail);
}