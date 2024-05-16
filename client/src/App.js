import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/homepage/HomePage.js";
import SignupPage from "./components/pages/signup/SignupPage.js";
import LoginPage from "./components/pages/login/LoginPage.js";

const URL = "http://localhost:4000/user/";

const App = () => {
	const [users, setUser] = useState("");

	const fetchData = async () => {
		let result = "";

		try {
			const res = await axios.get(URL);
			result = JSON.stringify(res);

			setUser(result);
		} catch (error) {
			console.log("Error: ", error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<HomePage />} />
				<Route exact path="/signup" element={<SignupPage />} />
				<Route exact path="/login" element={<LoginPage />} />
			</Routes>
		</>
	);
};

export default App;
