import type { NextFunction, Request, Response } from "express";

export function requireApiKey(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const apiKey = request.header("x-api-key");
    const expectedApiKey = process.env.API_KEY;
    if (!expectedApiKey) {
        response.status(500).json({ error: "API key is not configured" });
        return;
    }
    if (apiKey !== expectedApiKey) {
        response.status(401).json({ error: "Invalid API key" });
        return;
    }
    next();
}