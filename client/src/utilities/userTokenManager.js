import jwt_decode from "jwt-decode";

export const registerUser = (accessToken) => {
	localStorage.setItem("accessToken", accessToken);
};

export const getUser = () => {
	const accessToken = localStorage.getItem("accessToken");
	if (!accessToken) return undefined;
	return jwt_decode(accessToken);
};

export const removeUser = () => {
	localStorage.removeItem("accessToken");
};
