import type { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

const logsDirectory = path.join(process.cwd(), "logs");
const accessLogPath = path.join(logsDirectory, "access.log");

export function logger(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    response.on("finish", async () => {
       const logLine = `${new Date().toISOString()} ${request.method} ${request.originalUrl} ${response.statusCode}\n`;
 await fs.mkdir(logsDirectory, { recursive: true });
 await fs.appendFile(accessLogPath, logLine, "utf-8");
    });
next();
}