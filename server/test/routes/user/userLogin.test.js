const request = require("supertest");
const {
	connectDB,
	dropDB,
	dropCollections,
} = require("../../../config/setupdb");
const makeApp = require("../../../app");
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

		it("should respond with a 400 status code when missing email", async () => {
			const res = await request(app).post("/user/login").send({
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Email is required");
		});

		it("should respond with a 400 status code invalid email", async () => {
			const res = await request(app).post("/user/login").send({
				email: "",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Invalid email");
		});

		it("cannot have email longer than 255 character", async () => {
			const res = await request(app).post("/user/login").send({
				email:
					"256aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Email must be less than 255 characters long"
			);
		});

		it("can have email 255 character long", async () => {
			const res = await request(app).post("/user/login").send({
				email:
					"255aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).not.toBe(400);
			expect(res.body.message).not.toBe(
				"Email must be less than 255 characters long"
			);
		});

		it("should respond with a 400 status code when missing password", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Password is required");
		});

		it("should respond with a 400 status code with invalid password", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password: "",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must be at least 8 characters long"
			);
		});

		it("cannot have password more than 100 character long", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password:
					"101Pass$100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must be less than 100 characters long"
			);
		});

		it("can have 100 character long password", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password:
					"100Pass$10aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			});

			expect(res.statusCode).not.toBe(400);
			expect(res.body.message).not.toBe(
				"Password must be less than 100 characters long"
			);
		});

		it("cannot have password without lowercase letter", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password: "TESTPASS$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("cannot have password without upper character letter", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password: "testpass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("cannot have password without number", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password: "TestPass$Tes",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("cannot have password without spcial character", async () => {
			const res = await request(app).post("/user/login").send({
				email: "test@gmail.com",
				password: "TestPass1000",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("should respond with a 401 status code when email does not exist", async () => {
			const res = await request(app).post("/user/login").send({
				email: "email_does_not_exist_in_database@gmail.com",
				password: "Test123$",
			});

			expect(res.statusCode).toBe(401);
			expect(res.body.message).toBe("Incorrect email or password");
		});

		it("should respond with a 401 status code when email exists but password is wrong", async () => {
			const username = "testtest";
			const email = "test@gmail.com";
			const password = "Test123$";
			const wrongPassword = "TestTest123$";

			await request(app).post("/user/signup").send({
				username,
				email,
				password,
			});

			const res = await request(app).post("/user/login").send({
				email: email,
				password: wrongPassword,
			});

			expect(res.statusCode).toBe(401);
			expect(res.body.message).toBe("Incorrect email or password");
		});

		it("should respond with a 200 status code and accessToken when valid email and password", async () => {
			const username = "testtest";
			const email = "test@gmail.com";
			const password = "Test123$";

			await request(app).post("/user/signup").send({
				username,
				email,
				password,
			});

			const res = await request(app).post("/user/login").send({
				email: email,
				password,
			});

			expect(res.statusCode).toBe(200);
			expect(res.body.message).not.toBe("Incorrect email or password");
			expect(res.body.accessToken).toBeTruthy();
		});

		it("email must be case insensitive", async () => {
			const username = "testtest";
			const lowercaseEmail = "test@gmail.com";
			const uppercaseEmail = "TEST@GMAIL.COM";
			const password = "Test123$";

			await request(app).post("/user/signup").send({
				username,
				email: lowercaseEmail,
				password,
			});

			const res = await request(app).post("/user/login").send({
				email: uppercaseEmail,
				password,
			});

			expect(res.statusCode).toBe(200);
			expect(res.body.message).not.toBe("Incorrect email or password");
			expect(res.body.accessToken).toBeTruthy();
		});

		it("password must ignore blank space before and after password", async () => {
			const username = "testtest";
			const email = "test@gmail.com";
			const signupPassword = "      Test123$         ";
			const loginPassword = "  Test123$ ";

			await request(app).post("/user/signup").send({
				username,
				email,
				password: signupPassword,
			});

			const res = await request(app).post("/user/login").send({
				email,
				password: loginPassword,
			});

			expect(res.statusCode).toBe(200);
			expect(res.body.message).not.toBe("Incorrect email or password");
			expect(res.body.accessToken).toBeTruthy();
		});
	});
});
