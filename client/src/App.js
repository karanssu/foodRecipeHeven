import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/homepage/HomePage.js";
import SignupPage from "./components/pages/signup/SignupPage.js";
import LoginPage from "./components/pages/login/LoginPage.js";
import { createContext, useEffect, useState } from "react";
import { getUser } from "./utilities/userTokenManager.js";

export const UserContext = createContext();

const App = () => {
	const [user, setUser] = useState(null);

	const fetchUser = () => {
		fetch(`${process.env.REACT_APP_SERVER_URL}/google/auth/login/success`, {
			method: "GET",
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": true,
			},
		})
			.then((res) => {
				if (res.status === 200) return res.json();
				else setUser(getUser());
			})
			.then((resObj) => setUser(resObj.user))
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<>
			<UserContext.Provider value={[user, setUser]}>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<HomePage />} />
					<Route exact path="/signup" element={<SignupPage />} />
					<Route exact path="/login" element={<LoginPage />} />
				</Routes>
			</UserContext.Provider>
		</>
	);
};

export default App;
