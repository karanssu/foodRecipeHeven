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

const removeGoogleUser = () => {
	fetch(`${process.env.REACT_APP_SERVER_URL}/google/auth/logout`, {
		method: "GET",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"Access-Control-Allow-Credentials": true,
		},
	})
		.then((res) => {
			if (res.status !== 200) throw new Error("Google User logout failed!");
		})
		.catch((error) => console.error(error));
};

export const removeUser = () => {
	localStorage.removeItem("accessToken");
	removeGoogleUser();
};
