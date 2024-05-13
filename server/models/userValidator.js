const z = require("zod");

const userSignupValidator = (data) => {
    const signupValidationSchema = z.object({
        username: z.string().min(6, "Username must be 6 characters or more"),
        email: z.string().email("Please Input a valid email"),
        password: z
            .string()
            .min(8, "Password must be 8 or more characters")
            .trim(),
    });

    return signupValidationSchema.safeParse(data);
};

const userLoginValidator = (data) => {
    const loginValidationSchema = z.object({
        username: z.string().min(6, "Username must be 6 characters or more"),
        password: z
            .string()
            .min(8, "Password must be 8 or more characters")
            .trim(),
    });
    return loginValidationSchema.safeParse(data);
};

module.exports.userSignupValidation = userSignupValidator;
module.exports.userLoginValidation = userLoginValidator;