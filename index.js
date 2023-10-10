const express = require("express")
const app = express()

// use ejs files to prepare templates for views
const path = require("path")
app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/",(req, res) => {
	// get data from file
	fs.readFile("./tasks", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		console.log(data);
		console.log(typeof data);
		// task list data
		const tasks = ["Study HTML","Study CSS","Study JS","Study OOP"]
		res.render("index",{tasks: tasks})
	});
	
})

app.listen(3001, () => {
	console.log("example app is started at http://localhost:3001")
})