import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
   res.set('Content-type', 'text/html')
  res.send(`<html><body>Hello World</body></html>`);
});

test("test ExpressJS", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe(`<html><body>Hello World</body></html>`);
  expect(response.get('Content-type')).toContain('text/html');
});
