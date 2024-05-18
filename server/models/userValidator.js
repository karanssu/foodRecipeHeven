const z = require("zod");

const userSignupValidator = (data) => {
	const signupValidationSchema = z.object({
		username: z
			.string({
				required_error: "Username is required",
			})
			.min(6, { message: "Username must be at least 6 characters long" })
			.max(20, { message: "Username must be less than 20 characters long" })
			.regex(/^[a-zA-Z0-9_.]+$/, {
				message:
					"Username can only contain letters, numbers, underscores, and periods",
			})
			.refine(
				(value) => !["admin", "administrator"].includes(value.toLowerCase()),
				{
					message: "Username is not allowed",
				}
			)
			.refine((value) => !/\s/.test(value), {
				message: "Username cannot contain spaces",
			})
			.refine((value) => !/\.{2,}/.test(value), {
				message: "Username cannot contain consecutive periods",
			}),
		email: z
			.string({
				required_error: "Email is required",
			})
			.email({ message: "Invalid email" })
			.max(255, {
				message: "Email must be less than 255 characters long",
			}),
		password: z
			.string({
				required_error: "Password is required",
			})
			.trim()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(100, {
				message: "Password must be less than 100 characters long",
			})
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
				message:
					"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
			})
			.refine((value) => !/\s/.test(value), {
				message: "Password cannot contain spaces",
			}),
	});

	return signupValidationSchema.safeParse(data);
};

const userLoginValidator = (data) => {
	const loginValidationSchema = z.object({
		email: z.string().email({ message: "Invalid email format" }).max(255, {
			message: "Email is too long, cannot be longer than 255 characters",
		}),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.max(100, { message: "Password cannot be longer than 100 characters" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
				message:
					"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
			})
			.refine((value) => !/\s/.test(value), {
				message: "Password cannot contain spaces",
			}),
	});
	return loginValidationSchema.safeParse(data);
};

module.exports.userSignupValidator = userSignupValidator;
module.exports.userLoginValidator = userLoginValidator;
