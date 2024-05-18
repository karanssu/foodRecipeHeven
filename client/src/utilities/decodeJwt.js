import jwt_decode from "jwt-decode";

const getUser = () => {
	const accessToken = localStorage.getItem("accessToken");
	if (!accessToken) return undefined;
	return jwt_decode(accessToken);
};

const removeUser = () => {
	localStorage.removeItem("accessToken");
};

export default getUser;
