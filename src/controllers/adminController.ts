import type { Request, Response } from "express";
import { getAllTrails } from "../models/trailModel.ts"
import { formatDate} from "../utils/formatDate.ts";

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