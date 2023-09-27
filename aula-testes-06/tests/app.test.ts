import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {

  it("/health", async ()=>{
    const result = await api.get("/health")
    expect(result.statusCode).toBe(200)
  })

  it("/event", async ()=>{
    const result = await api.get("/event")
    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      image: expect.any(String),
      date: expect.any(String)
    }))
  })

});