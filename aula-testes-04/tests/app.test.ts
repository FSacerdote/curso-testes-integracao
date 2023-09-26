import supertest from "supertest";
import app from "../src/app";

describe("/health", ()=>{
    it("Should return status 200", async ()=>{
        const result = await supertest(app).get("/health")
        const status = result.statusCode
        expect(status).toBe(200)
    })
})