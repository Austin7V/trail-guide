import type { Request , Response} from "express";
import { getAllRegions, getRegionBySlug} from "../models/regionModel.ts";
import { getTrailsByRegionId} from "../models/trailModel.ts";
import { formatDate} from "../utils/formatDate.ts";

export async function renderRegionsPage(
    _request: Request,
    response: Response,
) {
    const regions = await getAllRegions();
    response.render("regions.html", {
        title: "Regions",
        regions,
    });
}

export async function renderRegionDetailPage(
    request: Request<{ slug: string }>,
    response: Response,
) {
    const {slug} = request.params;
    const region = await getRegionBySlug(slug);
    if (!region) {
        response.status(404).send("Refion not found");
        return;
    }
    const trails = await getTrailsByRegionId(region.id);
    const viewTrails = trails.map((trail)=> ({
        ...trail,
        created_at: formatDate(trail.created_at),
    }));

    response.render("region.html", {
        title: region.name,
        region,
        trails: viewTrails,
    });
}