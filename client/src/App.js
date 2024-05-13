import axios from "axios";
import { useEffect, useState } from "react";

const URL = "http://localhost:4000/user/";

function App() {
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

	return <>{users}</>;
}

export default App;
