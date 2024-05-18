import "./LoginPage.css";
import emailIcon from "../../../images/emailIcon.png";
import passwordIcon from "../../../images/passwordIcon.png";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../../Form/FormInput";
import GoogleLoginBtn from "../../Form/GoogleLoginBtn";
import { UserContext } from "../../../App";
import { getUser, registerUser } from "../../../utilities/userTokenManager";

const serverUrl = process.env.REACT_APP_SERVER_URL;
const loginUrl = serverUrl + "/user/login";

const LoginPage = () => {
	const [user, setUser] = useContext(UserContext);

	const [error, setError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const emailRef = useRef("");
	const passwordRef = useRef("");

	const navigate = useNavigate();

	const clearErrorMessages = () => {
		setError("");
		setEmailError("");
		setPasswordError("");
	};

	const handleErrorMessage = (errorMessage) => {
		if (!errorMessage) return;

		const errorRegex = /incorrect/i;
		const emailRegex = /email/i;
		const passwordRegex = /password/i;

		if (errorRegex.test(errorMessage)) {
			setError(errorMessage);
			return;
		} else {
			setError("");
		}
		emailRegex.test(errorMessage)
			? setEmailError(errorMessage)
			: setEmailError("");
		passwordRegex.test(errorMessage)
			? setPasswordError(errorMessage)
			: setPasswordError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = emailRef.current.value.trim();
		const password = passwordRef.current.value.trim();

		await axios
			.post(loginUrl, {
				email,
				password,
			})
			.then((res) => {
				const { accessToken } = res;
				registerUser(accessToken);
				setUser(getUser());
				navigate("/");
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
					<div className="login-form">
						<div className="create-account-title mb-5">
							<h1>Log in</h1>
						</div>
						{error && (
							<div class="alert alert-danger my-5" role="alert">
								{error}.
							</div>
						)}
						<form onSubmit={handleSubmit}>
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<FormInput
										id={1}
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
										id={2}
										type="password"
										icon={passwordIcon}
										placeholder="Password"
										inputRef={passwordRef}
										handleChange={clearErrorMessages}
										errorMessage={passwordError}
									/>
								</div>
							</div>
							<button type="submit" className="btn form-login-btn py-md-2">
								Log in
							</button>
						</form>
						<div className="text-center mt-2 mt-md-3">
							<p>
								Don't have an account? <a href="/signup">Sign up</a>
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

export default LoginPage;
