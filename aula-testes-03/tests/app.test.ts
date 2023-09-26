import calculator from "calculator"

describe("Testes com contas", ()=>{
    it("Should return the sum of two numbers", ()=>{
        expect(calculator.sum(3, 2)).toBe(5)
    })

    it("Should return the sub of two numbers", ()=>{
        expect(calculator.sub(5, 2)).toBe(3)
    })

    it("Should return the mul of two numbers", ()=>{
        expect(calculator.mul(5, 2)).toBe(10)
    })

    it("Should return the div of two numbers", ()=>{
        expect(calculator.div(10, 2)).toBe(5)
    })
})