import type { Request, Response } from "express";
import { addTrail, getAllTrails, slugify } from "../models/trailModel.ts"
import { formatDate} from "../utils/formatDate.ts";
import sanitizeHtml from "sanitize-html";
import { getAllRegions } from "../models/regionModel";

const allowedHtmlOptions = {
    allowedTags: ["p", "br", "strong", "em", "ul", "ol", "li", "a"],
    allowedAttributes: {
        a: ["href", "target", "rel"],
    },
};

export async function renderAdminTrailList(
    _request: Request,
    response: Response,
) {
    const trails = await getAllTrails();

    const viewTrails = trails.map((trail)=> ({
        ...trail,
        created_at:formatDate(trail.created_at),
    }));

    response.render("admin/list.html", {
        title: "Admin Trails",
        trails: viewTrails,
    });
}

export async function renderNewTrailForm(
    _request: Request,
    response: Response,
) {
    const regions = await getAllRegions();

    response.render("admin/form.html", {
        title: "New Trail",
        formAction: "/admin/trails",
        submitLabel: "Create Trail",
        regions,
        trail: {
            title: "",
            description: "",
            difficulty: "easy",
            distance_km: "",
            region_id: "",
        },
    });
}

export async function createTrail(request: Request, response: Response) {
    const { title, description, difficulty, distance_km, region_id } =
        request.body;

    if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof difficulty !== "string" ||
        typeof distance_km !== "string" ||
        typeof region_id !== "string"
    ) {
        response.status(400).send("Invalid form data");
        return;
    }

    await addTrail({
        title: title.trim(),
        slug: slugify(title),
        description: sanitizeHtml(description, allowedHtmlOptions),
        difficulty,
        distance_km: Number(distance_km),
        region_id: Number(region_id),
        created_at: new Date().toISOString(),
    });

    response.redirect("/admin");
}