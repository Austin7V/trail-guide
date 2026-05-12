import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { addTrail,
    getAllTrails,
    getTrailBySlug,
slugify,
} from "../models/trailModel.ts";

const allowedHtmlOptions = {
    allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
    allowedAttributes: {
        a: ["href", "target", "rel"],
    },
};

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

export async function createTrailApi(request: Request, response: Response) {
    const { title, description, difficulty, distance_km, region_id } =
        request.body;

    if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof difficulty !== "string" ||
        typeof distance_km !== "number" ||
        typeof region_id !== "number"
    ) {
        response.status(400).json({
            error:
                "Missing or invalid required fields: title, description, difficulty, distance_km, region_id",
        });
        return;
    }

    await addTrail({
        title: title.trim(),
        slug: slugify(title),
        description: sanitizeHtml(description, allowedHtmlOptions),
        difficulty,
        distance_km,
        region_id,
        created_at: new Date().toISOString(),
    });

    const createdTrail = await getTrailBySlug(slugify(title));

    response.status(201).json(createdTrail);
}

