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

		it("should respond with a 200", async () => {
			const res = await request(app).get("/food/preview");

			expect(res.statusCode).toBe(200);
		});
	});
});
