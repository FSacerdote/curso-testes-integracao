import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("Fibonacci tests", () => {

    it("Should return status 200 and the fibonacci sequence with 5 elements", async ()=>{
        const result = await api.get("/fibonacci").query({elements: 5})
        expect(result.statusCode).toBe(200)
        expect(result.body).toEqual([0,1,1,2,3])
    })

    it("Should return status 400 for elements: null", async ()=>{
        const result = await api.get("/fibonacci")
        expect(result.statusCode).toBe(400)
    })

    it("Should return status 400 for elements: string", async ()=>{
        const result = await api.get("/fibonacci").query({elements: "Nome do meu cachorro"})
        expect(result.statusCode).toBe(400)
    })

    it("Should return status 400 for elements < 1", async ()=>{
        const result = await api.get("/fibonacci").query({elements: 0})
        expect(result.statusCode).toBe(400)
    })

})