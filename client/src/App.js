import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from "./components/Navbar";

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
		</>
	);
};

export default App;
