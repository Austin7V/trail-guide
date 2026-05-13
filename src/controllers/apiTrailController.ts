import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { addTrail,
        deleteTrail,
        getAllTrails,
        getTrailById,
        getTrailBySlug,
        getTrailsByRegionId,
        slugify,
        updateTrail,
} from "../models/trailModel.ts";
import { getRegionBySlug } from "../models/regionModel.ts";

const allowedHtmlOptions = {
    allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
    allowedAttributes: {
        a: ["href", "target", "rel"],
    },
};

export async function getTrailsApi(request: Request, response: Response) {
    const { region, difficulty } = request.query;
    if (difficulty !== undefined && typeof difficulty !== "string") {
        response.status(400).json({ error: "Invalid difficulty filter" });
        return;
    }
    if (region !== undefined && typeof region !== "string") {
        response.status(400).json({ error: "Invalid region filter" });
        return;
    }
    let trails;

    if (region) {
        const foundRegion = await getRegionBySlug(region);
        if (!foundRegion) {
            response.status(404).json({ error: "Region not found" });
            return;
        }
        trails = await getTrailsByRegionId(foundRegion.id);
    } else {
        trails = await getAllTrails();
    }

    const filteredTrails = difficulty
        ? trails.filter((trail) => trail.difficulty === difficulty)
        : trails;

    response.status(200).json(filteredTrails);
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

export async function updateTrailApi(
    request: Request<{ id: string }>,
    response: Response,
) {
    const id = Number(request.params.id);
    if (!Number.isInteger(id)) {
        response.status(400).json({ error: "Invalid trail id" });
        return;
    }

    const existingTrail = await getTrailById(id);
    if (!existingTrail) {
        response.status(404).json({ error: "Trail not found" });
        return;
    }

    const { title, description, difficulty, distance_km, region_id } =
        request.body;

    const updatedTitle =
        typeof title === "string" ? title.trim() : existingTrail.title;

    const updatedDescription =
        typeof description === "string"
            ? sanitizeHtml(description, allowedHtmlOptions)
            : existingTrail.description;

    const updatedDifficulty =
        typeof difficulty === "string" ? difficulty : existingTrail.difficulty;

    const updatedDistanceKm =
        typeof distance_km === "number" ? distance_km : existingTrail.distance_km;

    const updatedRegionId =
        typeof region_id === "number" ? region_id : existingTrail.region_id;

    const updatedTrail = {
        title: updatedTitle,
        slug: slugify(updatedTitle),
        description: updatedDescription,
        difficulty: updatedDifficulty,
        distance_km: updatedDistanceKm,
        region_id: updatedRegionId,
    };

    const wasUpdated = await updateTrail(id, updatedTrail);
    if (!wasUpdated) {
        response.status(404).json({ error: "Trail not found" });
        return;
    }

    const savedTrail = await getTrailById(id);

    response.status(200).json(savedTrail);
}

export async function deleteTrailApi(
    request: Request<{ id: string}>,
    response: Response,
) {
    const id = Number(request.params.id);
    if ( !Number.isInteger(id)) {
        response.status(400).json({ error: "Invalid trail id"});
        return;
    }
    const wasDeleted = await deleteTrail(id);
    if (!wasDeleted) {
        response.status(404).json({ error: "Trail not found"});
        return;
    }
    response.status(204).send();
}