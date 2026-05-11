import type { Request, Response } from "express";
import { getAllTrails, getTrailBySlug  } from "../models/trailModel";
import { formatDate} from "../utils/formatDate";

export async function renderHomePage(_request: Request, response: Response) {
    const trails = await getAllTrails();
    const viewTrails = trails.map((trail)=> ({
        ...trail,
        created_at: formatDate(trail.created_at),
    }));

    response.render("index.html", {
        title: "Trail Guide",
        trails: viewTrails,
    });
}

export async function renderTrailDetailPage(
    request: Request<{ slug: string }>,
    response: Response,
) {
    const { slug } = request.params;
    const trail = await getTrailBySlug(slug);

    if(!trail) {
        response.status(400).send("Trail not found");
        return;
    }
    response.render("trail.html", {
        title: trail.title,
        trail: {
            ...trail,
            created_at: formatDate(trail.created_at),
        },
    });
}