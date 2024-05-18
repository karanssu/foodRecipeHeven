import "./GoogleLoginBtn.css";
import googleIcon from "../../images/googleIcon.png";

const GoogleLoginBtn = () => {
	return (
		<>
			<button className="btn form-google-signup-btn py-2">
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
