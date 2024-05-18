import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/homepage/HomePage.js";
import SignupPage from "./components/pages/signup/SignupPage.js";
import LoginPage from "./components/pages/login/LoginPage.js";
import { createContext, useEffect, useState } from "react";
import getUser from "./utilities/userTokenManager.js";

export const UserContext = createContext();

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(getUser());
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
