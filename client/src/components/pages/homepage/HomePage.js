import { useContext } from "react";
import { UserContext } from "../../../App";

const HomePage = () => {
	const [user, setUser] = useContext(UserContext);

	return (
		<>
			{user && <div>{user.username}</div>}
			HomePage
		</>
	);
};

export default HomePage;
