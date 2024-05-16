const request = require("supertest");
const { connectDB, dropDB, dropCollections } = require("../config/setupdb");
const makeApp = require("../app");
let app;

describe("POST/ users", () => {
	describe("given a username, email and password", () => {
		beforeAll(async () => {
			const uri = await connectDB();
			app = makeApp(uri);
		});

		afterAll(async () => {
			await dropDB();
		});

		afterEach(async () => {
			await dropCollections();
		});

		it("should respond with a 200 status code", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("should respond with a 409 status code when user exists", async () => {
			await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});
			expect(res.statusCode).toBe(409);
		});

		it("should specify json in the content type header", async () => {
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
