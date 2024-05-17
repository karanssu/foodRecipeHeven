import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/homepage/HomePage.js";
import SignupPage from "./components/pages/signup/SignupPage.js";
import LoginPage from "./components/pages/login/LoginPage.js";

const App = () => {
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
