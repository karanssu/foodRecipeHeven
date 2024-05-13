const supertest = require("supertest");
const app = require("./app");

describe("POST/ users", () => {
	describe("given a username, email and password", () => {
		test("should respond with a 200 status code", async () => {
			const res = await supertest(app).post("/user/signup").send({
				username: "testUsername",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});
	});
});
