import { jwtDecode } from "jwt-decode";

export const registerUser = (accessToken) => {
	localStorage.setItem("accessToken", accessToken);
};

export const getUser = () => {
	try {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) return null;

		return jwtDecode(accessToken);
	} catch (error) {
		return null;
	}
};

export const removeUser = () => {
	localStorage.removeItem("accessToken");
};
