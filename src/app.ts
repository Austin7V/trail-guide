import express from "express";
import nunjucks from "nunjucks";
import path from "node:path";

const app = express();

const port = Number(process.env.PORT) || 3000;

nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.set("view engine", "html");

app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (_request, response) => {
    response.render("index.html", {
        title: "Trail Guide",
    });
});

app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`);
});