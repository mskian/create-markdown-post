const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
    it("responds 200", (done) => {
        request(app).get("/").expect(200, done);
    })
});