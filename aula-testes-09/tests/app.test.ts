import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }

    const result = await api.post("/users").send(user)
    expect(result.statusCode).toBe(201)
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }

    await prisma.user.create({
      data: user
    })

    const result = await api.post("/users").send(user)
    expect(result.statusCode).toBe(409)
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }

    await prisma.user.create({
      data: user
    })

    const result = await api.get("/users")
    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveLength(1)
  });

  it("should return 404 when can't find a user by id", async () => {
    const result = await api.get("/users/1")
    expect(result.status).toBe(404)
  });

  it("should return all users", async () => {
    const user = {
      email: "teste@teste.com",
      password: "123456"
    }

    const user1 = {
      email: "julia@teste.com",
      password: "123456"
    }

    const user2 = {
      email: "pedro@teste.com",
      password: "123456"
    }

    await prisma.user.createMany({
      data: [user, user1, user2]
    })
    
    const result = await api.get("/users")
    expect(result.statusCode).toBe(200)
    expect(result.body).toHaveLength(3)
    expect(result.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        email: expect.any(String)
      })
    ]))
  });

})