import express from "express";

const app = express();

const port = Number(process.env.PORT) || 3000;

app.get("/", (_request, response) => {
    response.send("hello world!");
});

app.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`);
});