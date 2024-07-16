import express from "express";
import request from "supertest";

const app = express();

app.get('/', (req, res) => {
  if(req.query.name){
    res.status(200);
    res.send(`Hello ${req.query.name}`);
  }else{
    res.status(400)
    res.end()
  }
});

test("test Response Status", async () => {
  let response = await request(app).get("/").query({name: "Dudan"});
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello Dudan");

  response = await request(app).get("/");
  expect(response.status).toBe(400);
});
