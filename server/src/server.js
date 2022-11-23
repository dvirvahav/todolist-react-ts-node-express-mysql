"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
const port = 5000;
const mysql = require("mysql");
// Connection details
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "todolist",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// this sends all data from DB
app.post("/api/getAllData", (request, response) => {
    const username = request.body.username;
    const sqlAllData = `select id, name from lists where username=?;`;
    db.query(sqlAllData, [username], (err, result1) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else {
            db.query(`Select lists.id as "listID",tasks.id as "taskID",tasks.name as "taskName", tasks.status,  DATE_FORMAT(tasks.date, '%m/%d/%Y, %r') as date from lists,tasks where username=? and lists.id=tasks.list_id order by listID
          `, [username], (err, result2) => {
                console.log(result2);
                response.send([result1, result2]);
            });
        }
    });
});
// this handles remove task from DB
app.post("/api/removeTask", (request, response) => {
    const taskID = request.body.taskID;
    const sqlDeleteTask = `DELETE from tasks where id=?;`;
    db.query(sqlDeleteTask, [taskID], (err, result) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else {
            response.send("OK");
        }
    });
});
// this handles remove list from DB
app.post("/api/removeList", (request, response) => {
    const listID = request.body.listID;
    const sqlDeleteTasks = `DELETE from tasks where list_id=?;`;
    const sqlDeleteList = `DELETE from lists where id=?;`;
    db.query(sqlDeleteTasks, [listID], (err, result) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else {
            db.query(sqlDeleteList, [listID], (err, result) => {
                if (err) {
                    response.send("Error");
                    console.log(err);
                }
                response.send("OK");
            });
        }
    });
});
// this handles update list name
app.post("/api/updateTask", (request, response) => {
    const taskID = request.body.taskID;
    const newName = request.body.newName;
    const sqlUpdateTaskName = `UPDATE tasks
    SET name=?
    WHERE id=?;`;
    db.query(sqlUpdateTaskName, [newName, taskID], (err, result) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else {
            response.send("OK");
        }
    });
});
// this handles update list name
app.post("/api/updateList", (request, response) => {
    const listID = request.body.listID;
    const newName = request.body.newName;
    const sqlUpdateListName = `UPDATE lists
    SET name=?
    WHERE id=?;`;
    db.query(sqlUpdateListName, [newName, listID], (err, result) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
    });
});
// this handles insert task requests from clients
app.post("/api/insertTask", (request, response) => {
    const listID = request.body.listID;
    const taskName = request.body.taskName;
    const sqlInsertTask = `INSERT INTO tasks (list_id,name) VALUES
    (?,?) `;
    db.query(sqlInsertTask, [listID, taskName], (err, result) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else {
            //send id that set automatically by sql auto-incremental func
            db.query("SELECT max(id) as id, date from tasks where list_id=?", listID, (err, result) => {
                response.send(result); // return id + date created(sql auto-generate)
            });
        }
    });
});
// this handles insert requests from clients
app.post("/api/insertList", (request, response) => {
    // const listID: string = request.body.listID;
    const listName = request.body.listName;
    const username = request.body.username;
    const sqlInsertList = `INSERT INTO lists (username,name) VALUES
    (?,?)`;
    db.query(sqlInsertList, [username, listName], (err, result) => {
        if (err) {
            response.send("Error");
            console.log(err);
        }
        else {
            //send id that set automatically by sql auto-incremental func
            db.query("SELECT max(id) as id from lists where username=?", username, (err, result) => {
                response.send(result);
            });
        }
    });
});
// this handles login requests from clients
app.post("/api/login", (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const sqlCheckLogin = `SELECT u.username,u.mail,u.first,u.last from users as u where u.username=? AND u.password=?
    `;
    db.query(sqlCheckLogin, [username, password], (err, result) => {
        if (!result.length) {
            response.send("Error");
        }
        else {
            console.log(result);
            response.send(result);
        }
    });
});
// this handles signup requests from clients
app.post("/api/signup", (request, response) => {
    const username = request.body.username;
    const mail = request.body.mail;
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const password = request.body.password;
    const sqlInsert = `INSERT INTO users (username, mail, first, last, password) VALUES
   (?,?,?,?,?)`;
    db.query(sqlInsert, [username, mail, firstName, lastName, password], (err, result) => {
        if (err) {
            response.send("Error");
        }
        else {
            response.send("Success");
        }
    });
});
// port + msg that says its listening
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
