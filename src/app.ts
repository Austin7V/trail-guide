import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";
import { closeDB,  connectDB} from "./models/db.ts";
import websiteRoutes from "./routes/websiteRoutes.ts";
import { logger } from "./middleware/logger.ts"
import adminRoutes from "./routes/adminRoutes.ts";
import apiRoutes from "./routes/apiRoutes.ts";

const app = express();

const port = Number(process.env.PORT) || 3000;

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.set("view engine", "html");

app.use(express.static(path.join(process.cwd(), "public")));
app.use(logger);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", websiteRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

async function startServer() {
    await connectDB();

    app.listen(port, ()=> {
        console.log(`Server running at http://localhost:${port}`);
    });
}

async function shutdown() {
    await closeDB();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});