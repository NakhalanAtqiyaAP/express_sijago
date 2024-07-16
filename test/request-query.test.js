import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test("test Request Query", async () => {
  const response = await request(app).get("/").query({firstName: "Dudan", lastName:"Aspullah"});
  expect(response.text).toBe("Hello Dudan Aspullah");
});


