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
		fs.readFile(filename, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}
		// task list data
		const tasks = JSON.parse(data)
		resolve(tasks)
	});
  })
}

const writeFile = (filename, data) => {
	return new Promise((resolve,reject)=> {
		fs.writeFile(filename,data,"utf-8",err => {
			if (err) {
			console.error(err);
			return;
		}
			resolve(true);
		});
	})
}

/*const selectAnddel(index) => {
	const selectedValue = fs.readFile
}*/

app.get('/',(req, res) => {
	// get data from file
	readFile("./tasks.json")
		.then(tasks => {
			res.render("index", {tasks: tasks})
		})
	})


// for parsing application / x-www-form-urlencoded
app.use(express.urlencoded({expanded: true}));

app.post("/", (req, res) => {
	// get data from file
	readFile("./tasks.json")
		.then(tasks => {
			let index
			if(tasks.length === 0)
				{
					index = 0;
				}else{
					index = tasks[tasks.length-1].id + 1;
				}
				const newTask = {
					"id" : index,
					"task" : req.body.task
				}
				tasks.push(newTask)
				data = JSON.stringify(tasks, null,2)
				writeFile("tasks.json", data)
				//redirect to / to see result
				res.redirect("/")
		})
})

app.get('/delete-task/:taskId', (req, res) => {
	let deletedTaskId = parseInt(req.params.taskId)
	readFile("./tasks.json")
	.then(tasks => {
		tasks.forEach((task,index) => {
			if(task.id === deletedTaskId){
				tasks.splice(index, 1)
			}
	})
	data = JSON.stringify(tasks, null,2)
	writeFile("tasks.json", data)
				//redirect to / to see result
				res.redirect("/")
	})
})


app.listen(3001, () => {
	console.log("example app is started at http://localhost:3001")
})