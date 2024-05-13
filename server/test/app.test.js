const request = require("supertest");
const app = require("../app");

const uniqueUsername = "testUsername7";

describe("POST/ users", () => {
	describe("given a username, email and password", () => {
		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/user/signup").send({
				username: uniqueUsername,
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		test("should respond with a 409 status code when user exists", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(409);
		});

		test("should specify json in the content type header", async () => {
			const res = await request(app).post("/user/signup").send({
				username: uniqueUsername,
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.headers["content-type"]).toEqual(
				expect.stringContaining("json")
			);
		});
	});
});
