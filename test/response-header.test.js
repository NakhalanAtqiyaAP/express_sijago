import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
res.set({
    "Judul": "Orangejahad",
    "Author": "Nakhalan Atqiya"
});
res.send("Hello Response");
});

test("test ExpressJS", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
  expect(response.get("Judul")).toBe("Orangejahad");
  expect(response.get("Author")).toBe("Nakhalan Atqiya");
});
