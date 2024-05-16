import "./SignupPage.css";
import userIcon from "../../../images/userIcon.png";
import emailIcon from "../../../images/emailIcon.png";
import passwordIcon from "../../../images/passwordIcon.png";
import confirmPasswordIcon from "../../../images/confirmPasswordIcon.png";
import googleIcon from "../../../images/googleIcon.png";

const SignupPage = () => {
	const userError = "Username is required";
	const emailError = "Email is required";
	const passwordError = "Password is required";
	const confirmPasswordError = "Confrim Password is required";

	return (
		<div className="container mt-5 ">
			<div className="row justify-content-center mx-3 mx-md-0">
				<div className="col-md-8">
					<div className="signup-form">
						<div className="create-account-title mb-5">
							<h1>Create Account</h1>
						</div>
						<form action="/signup" method="post">
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<div className="input-group">
										<div className="input-group-prepend">
											<span
												className="input-group-text signup-input-icon-container "
												id="basic-addon1"
											>
												<div
													style={{
														width: "25px",
														height: "25px",
													}}
													className="d-flex align-items-center justify-content-center"
												>
													<img
														src={userIcon}
														alt="User Icon"
														width="20"
														height="20"
													/>
												</div>
											</span>
										</div>
										<input
											type="text"
											className="form-control signup-input"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon1"
										/>
									</div>
									<div className="form-error text-danger mt-1">{userError}</div>
								</div>
							</div>
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<div className="input-group">
										<div className="input-group-prepend">
											<span
												className="input-group-text signup-input-icon-container"
												id="basic-addon2"
											>
												<div
													style={{
														width: "25px",
														height: "25px",
													}}
													className="d-flex align-items-center justify-content-center"
												>
													<img
														src={emailIcon}
														alt="Email Icon"
														width="20"
														height="20"
													/>
												</div>
											</span>
										</div>
										<input
											type="text"
											className="form-control signup-input"
											placeholder="Email"
											aria-label="Email"
											aria-describedby="basic-addon2"
										/>
									</div>
									<div className="form-error text-danger mt-1">
										{emailError}
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="mb-2 mb-md-3">
									<div className="input-group">
										<div className="input-group-prepend">
											<span
												className="input-group-text signup-input-icon-container"
												id="basic-addon3"
											>
												<div
													style={{
														width: "25px",
														height: "25px",
													}}
													className="d-flex align-items-center justify-content-center"
												>
													<img
														src={passwordIcon}
														alt="Password Icon"
														width="20"
														height="20"
													/>
												</div>
											</span>
										</div>
										<input
											type="password"
											className="form-control signup-input"
											placeholder="Password"
											aria-label="Password"
											aria-describedby="basic-addon3"
										/>
									</div>
									<div className="form-error text-danger mt-1">
										{passwordError}
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="mb-3 mb-md-4">
									<div className="input-group">
										<div className="input-group-prepend">
											<span
												className="input-group-text signup-input-icon-container"
												id="basic-addon4"
											>
												<div
													style={{
														width: "25px",
														height: "25px",
													}}
													className="d-flex align-items-center justify-content-center"
												>
													<img
														src={confirmPasswordIcon}
														alt="Confirm Password Icon"
														width="20"
														height="20"
													/>
												</div>
											</span>
										</div>
										<input
											type="password"
											className="form-control signup-input"
											placeholder="Confirm Password"
											aria-label="Confirm Password"
											aria-describedby="basic-addon4"
										/>
									</div>
									<div className="form-error text-danger mt-1">
										{confirmPasswordError}
									</div>
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
						<div className="or-divider mb-3 mb-md-4">
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
						<div className="google-signup-btn">
							<button className="btn form-google-signup-btn py-2">
								<div>
									<img
										src={googleIcon}
										alt="Confirm Password Icon"
										width="20"
										height="20"
										className="mx-3 "
									/>
									<span>Sign up with Google</span>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
