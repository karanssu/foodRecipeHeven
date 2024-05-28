const request = require("supertest");
const {
	connectDB,
	dropDB,
	dropCollections,
} = require("../../../../config/setupdb");
const makeApp = require("../../../../app");
let app;

describe("POST/ user/login", () => {
	describe("given email and password", () => {
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

		it("should respond with a 400 status code when missing email", async () => {
			const res = await request(app).post("/user/login").send({});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Email is required");
		});
	});
});
