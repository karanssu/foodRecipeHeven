const makeApp = require("./app");
require("dotenv").config();

const app = makeApp(process.env.DB_URL);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
