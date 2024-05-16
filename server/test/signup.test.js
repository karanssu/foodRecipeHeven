const request = require("supertest");
const { connectDB, dropDB, dropCollections } = require("../config/setupdb");
const makeApp = require("../app");
const User = require("../models/userModel");
let app;

describe("POST/ user/signup", () => {
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

		it("should respond with a 400 status code when missing username", async () => {
			const res = await request(app).post("/user/signup").send({
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Username is required");
		});

		it("should have at least 6 character long username", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "123456",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("cannot have less than 6 character long username", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "12345",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Username must be at least 6 characters long"
			);
		});

		it("cannot have empty username", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Username must be at least 6 characters long"
			);
		});

		it("cannot have more than 20 character long username", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "123456789123456789-21",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Username must be less than 20 characters long"
			);
		});

		it("can have between 6 and 20 character long username", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "1234567",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("can have username with latters, numbers, underscores, and periods", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "_test.1234",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("cannot have username with special symbols", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "test$&^%^(){}",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Username can only contain letters, numbers, underscores, and periods"
			);
		});

		it("cannot have username administrator", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "administrator",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Username is not allowed");
		});

		it("cannot have username with spaces", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "test username",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Username can only contain letters, numbers, underscores, and periods"
			);
		});

		it("cannot have username with consecutive periods", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "test..username",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Username cannot contain consecutive periods"
			);
		});

		it("should respond with a 400 status code when missing email", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Email is required");
		});

		it("should have valid email", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("cannot have invalid email", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test&gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Invalid email");
		});

		it("cannot have email longer than 255 character", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
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
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email:
					"255aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("should respond with a 400 status code when missing password", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe("Password is required");
		});

		it("should have password at least 8 character long", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("cannot have password less than 8 character long", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "Pass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must be at least 8 characters long"
			);
		});

		it("cannot have password more than 100 character long", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
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
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password:
					"100Pass$10aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			});

			expect(res.statusCode).toBe(200);
		});

		it("should have password with at leat one lowercase letter, one uppercase letter, one number, and one special character", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			expect(res.statusCode).toBe(200);
		});

		it("cannot have password without lowercase letter", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TESTPASS$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("cannot have password without upper character letter", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "testpass$10",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("cannot have password without number", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$Tes",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("cannot have password without spcial character", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass1000",
			});

			expect(res.statusCode).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});

		it("should respond with a 409 status code when username already exits", async () => {
			await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			const res = await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test222222@gmail.com",
				password: "TestPass$222222",
			});

			expect(res.statusCode).toBe(409);
			expect(res.body.message).toBe("Username is already taken");
		});

		it("should respond with a 409 status code when email already exists", async () => {
			await request(app).post("/user/signup").send({
				username: "testtest",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			const res = await request(app).post("/user/signup").send({
				username: "differettestusername",
				email: "test@gmail.com",
				password: "TestPass$222222",
			});
			expect(res.statusCode).toBe(409);
			expect(res.body.message).toBe("Email is already taken");
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

		it("should have user in the databse", async () => {
			const res = await request(app).post("/user/signup").send({
				username: "123456",
				email: "test@gmail.com",
				password: "TestPass$10",
			});

			const user = await User.findOne({ username: "123456" });

			expect(res.statusCode).toBe(200);
			expect(user).toBeTruthy();
			expect(user.username).toBe("123456");
			expect(user.email).toBe("test@gmail.com");
			expect(user.id).toBeTruthy();
			expect(user.date).toBeTruthy();
			expect(user.password).not.toBe("TestPass$10");
		});

		it("should handle signup attempt with malicious data", async () => {
			const maliciousPassword = "' OR 1=1;--";
			const res = await request(app).post("/user/signup").send({
				username: "malicioususer",
				email: "malicious@example.com",
				password: maliciousPassword,
			});

			expect(res.status).toBe(400);
			expect(res.body.message).toBe(
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
			);
		});
	});
});
