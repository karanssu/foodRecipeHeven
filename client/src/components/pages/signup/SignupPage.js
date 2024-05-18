import "./SignupPage.css";
import userIcon from "../../../images/userIcon.png";
import emailIcon from "../../../images/emailIcon.png";
import passwordIcon from "../../../images/passwordIcon.png";
import confirmPasswordIcon from "../../../images/confirmPasswordIcon.png";
import googleIcon from "../../../images/googleIcon.png";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Form/FormInput";
import GoogleLoginBtn from "../../Form/GoogleLoginBtn";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const signupUrl = serverUrl + "/user/signup";

const SignupPage = () => {
	const [userError, setUserError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");

	const usernameRef = useRef("");
	const emailRef = useRef("");
	const passwordRef = useRef("");
	const confirmPasswordRef = useRef("");

	const navigate = useNavigate();

	const handlePasswordMismatchError = (password, confirmPassword) => {
		if (password !== confirmPassword) {
			const errorMessage = "Passwords do not match";
			setConfirmPasswordError(errorMessage);
			return true;
		}

		setConfirmPasswordError("");
		return false;
	};

	const clearErrorMessages = () => {
		setUserError("");
		setEmailError("");
		setPasswordError("");
		setConfirmPasswordError("");
	};

	const handleErrorMessage = (errorMessage) => {
		if (!errorMessage) return;

		const usernameRegex = /username/i;
		const emailRegex = /email/i;
		const passwordRegex = /password/i;

		usernameRegex.test(errorMessage)
			? setUserError(errorMessage)
			: setUserError("");
		emailRegex.test(errorMessage)
			? setEmailError(errorMessage)
			: setEmailError("");
		passwordRegex.test(errorMessage)
			? setPasswordError(errorMessage)
			: setPasswordError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = usernameRef.current.value.trim();
		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();
		const confirmPassword = confirmPasswordRef.current.value.trim();

		const error = handlePasswordMismatchError(password, confirmPassword);
		if (error) return;

		await axios
			.post(signupUrl, {
				username,
				email,
				password,
			})
			.then((res) => {
				const { accessToken } = res;
				navigate("/login");
			})
			.catch((error) => {
				const errorMessage = error.response.data.message;
				handleErrorMessage(errorMessage);
			});
	};

	return (
		<div className="container mt-5 ">
			<div className="row justify-content-center mx-3 mx-md-5">
				<div className="col-md-8">
					<div className="signup-form">
						<div className="create-account-title mb-5">
							<h1>Create Account</h1>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<FormInput
										id={1}
										type="text"
										icon={userIcon}
										placeholder="Username"
										inputRef={usernameRef}
										handleChange={clearErrorMessages}
										errorMessage={userError}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<FormInput
										id={2}
										type="text"
										icon={emailIcon}
										placeholder="Email"
										inputRef={emailRef}
										handleChange={clearErrorMessages}
										errorMessage={emailError}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<FormInput
										id={3}
										type="password"
										icon={passwordIcon}
										placeholder="Password"
										inputRef={passwordRef}
										handleChange={clearErrorMessages}
										errorMessage={passwordError}
									/>
								</div>
							</div>
							<div className="form-group">
								<div className="mb-3 mb-md-4">
									<FormInput
										id={4}
										type="password"
										icon={confirmPasswordIcon}
										placeholder="Confirm Password"
										inputRef={confirmPasswordRef}
										handleChange={clearErrorMessages}
										errorMessage={confirmPasswordError}
									/>
								</div>
							</div>
							<button type="submit" className="btn form-signup-btn py-md-2">
								Sign Up
							</button>
						</form>
						<div className="text-center mt-2 mt-md-3">
							<p>
								Already have an account? <a href="/login">Sign in</a>
							</p>
						</div>
						<div className="or-divider my-4 my-md-5">
							<div className="container">
								<div className="row">
									<div className="col-5">
										<hr />
									</div>
									<div className="col-2">
										<div className="or-text">or</div>
									</div>
									<div className="col-5">
										<hr />
									</div>
								</div>
							</div>
						</div>
						<div className="google-signup-btn mb-5">
							<GoogleLoginBtn />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
