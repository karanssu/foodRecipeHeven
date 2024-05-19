import "./GoogleLoginBtn.css";
import googleIcon from "../../images/googleIcon.png";

const GoogleLoginBtn = () => {
	const handleGoogleAuth = () => {
		window.open(
			`${process.env.REACT_APP_SERVER_URL}/google/auth/google/callback`,
			"_self"
		);
	};

	return (
		<>
			<button
				className="btn form-google-signup-btn py-2"
				onClick={handleGoogleAuth}
			>
				<div>
					<img
						src={googleIcon}
						alt="Google Sign Up Icon"
						width="20"
						height="20"
						className="mx-3"
					/>
					<span>Log in with Google</span>
				</div>
			</button>
		</>
	);
};

export default GoogleLoginBtn;
