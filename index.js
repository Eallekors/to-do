const express = require("express")
const app = express()
const fs=require("fs");

// use ejs files to prepare templates for views
const path = require("path")
app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"))

const readFile = (filename) => {
	return new Promise((resolve, reject) => {
		//get data from file
		fs.readFile("./tasks", "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		// task list data
		const tasks = data.split("\n")
		resolve(tasks)
	})
})
}

app.get('/',(req, res) => {
	// get data from file
	readFile("./tasks")
		.then(tasks => {
			//console.log(tasks)
			res.render("index", {tasks, tasks})
		})
	})


// for parsing application / x-www-form-urlencoded
app.use(express.urlencoded({expanded: true}));

app.post("/", (req, res) => {
	// get data from file
	readFile("./tasks")
		.then(tasks => {
			tasks.push(req.body.task)
			const data = tasks.join("\n")
			fs.writeFile("./tasks", data, err => {
				if (err) {
					console.error(err);
					return;
				}
				//redirect to / to see result
				res.redirect("/")
			})
		})
})

app.listen(3001, () => {
	console.log("example app is started at http://localhost:3001")
})