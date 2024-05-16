const request = require("supertest");
const makeApp = require("../app");
require("dotenv").config();

const app = makeApp(process.env.TEST_DB_URL);
const { mongoose } = require("mongoose");

describe("POST/ users", () => {
	describe("given a username, email and password", () => {
		beforeAll((done) => {
			done();
		});

		afterAll((done) => {
			mongoose.connection.close();
			done();
		});

		test("should respond with a 200 status code", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
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
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.headers["content-type"]).toEqual(
				expect.stringContaining("json")
			);
		});
	});
});
