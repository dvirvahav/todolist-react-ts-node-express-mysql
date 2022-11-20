import Express from "express";

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
app.post(
  "/api/getAllData",
  (request: Express.Request, response: Express.Response) => {
    const username: string = request.body.username;
    const sqlAllData = `select id, name from lists where username=?;`;

    db.query(sqlAllData, [username], (err: any, result1: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      } else {
        db.query(
          `Select lists.id as "listID",tasks.id as "taskID",tasks.name as "taskName", tasks.status,  DATE_FORMAT(tasks.date, '%m/%d/%Y, %r') as date from lists,tasks where username=? and lists.id=tasks.list_id order by listID
          `,
          [username],
          (err: any, result2: any) => {
            console.log(result2);
            response.send([result1, result2]);
          }
        );
      }
    });
  }
);

// this handles remove task from DB
app.post(
  "/api/removeTask",
  (request: Express.Request, response: Express.Response) => {
    const taskID: string = request.body.taskID;
    const sqlDeleteTask = `DELETE from tasks where id=?;`;

    db.query(sqlDeleteTask, [taskID], (err: any, result: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      } else {
        response.send("OK");
      }
    });
  }
);

// this handles remove list from DB
app.post(
  "/api/removeList",
  (request: Express.Request, response: Express.Response) => {
    const listID: string = request.body.listID;

    const sqlDeleteTasks = `DELETE from tasks where list_id=?;`;
    const sqlDeleteList = `DELETE from lists where id=?;`;
    db.query(sqlDeleteTasks, [listID], (err: any, result: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      } else {
        db.query(sqlDeleteList, [listID], (err: any, result: any) => {
          if (err) {
            response.send("Error");
            console.log(err);
          }
          response.send("OK");
        });
      }
    });
  }
);
// this handles update list name
app.post(
  "/api/updateTask",
  (request: Express.Request, response: Express.Response) => {
    const taskID: string = request.body.taskID;
    const newName: string = request.body.newName;

    const sqlUpdateTaskName = `UPDATE tasks
    SET name=?
    WHERE id=?;`;

    db.query(sqlUpdateTaskName, [newName, taskID], (err: any, result: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      } else {
        response.send("OK");
      }
    });
  }
);

// this handles update list name
app.post(
  "/api/updateList",
  (request: Express.Request, response: Express.Response) => {
    const listID: string = request.body.listID;
    const newName: string = request.body.newName;

    const sqlUpdateListName = `UPDATE lists
    SET name=?
    WHERE id=?;`;

    db.query(sqlUpdateListName, [newName, listID], (err: any, result: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      }
    });
  }
);

// this handles insert task requests from clients
app.post(
  "/api/insertTask",
  (request: Express.Request, response: Express.Response) => {
    const listID: string = request.body.listID;
    const taskName: string = request.body.taskName;

    const sqlInsertTask = `INSERT INTO tasks (list_id,name) VALUES
    (?,?) `;

    db.query(sqlInsertTask, [listID, taskName], (err: any, result: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      } else {
        //send id that set automatically by sql auto-incremental func
        db.query(
          "SELECT max(id) as id, date from tasks where list_id=?",
          listID,
          (err: any, result: any) => {
            response.send(result); // return id + date created(sql auto-generate)
          }
        );
      }
    });
  }
);

// this handles insert requests from clients
app.post(
  "/api/insertList",
  (request: Express.Request, response: Express.Response) => {
    // const listID: string = request.body.listID;
    const listName: string = request.body.listName;
    const username: string = request.body.username;

    const sqlInsertList = `INSERT INTO lists (username,name) VALUES
    (?,?)`;

    db.query(sqlInsertList, [username, listName], (err: any, result: any) => {
      if (err) {
        response.send("Error");
        console.log(err);
      } else {
        //send id that set automatically by sql auto-incremental func
        db.query(
          "SELECT max(id) as id from lists where username=?",
          username,
          (err: any, result: any) => {
            response.send(result);
          }
        );
      }
    });
  }
);

// this handles login requests from clients
app.post(
  "/api/login",
  (request: Express.Request, response: Express.Response) => {
    const username: string = request.body.username;
    const password: string = request.body.password;

    const sqlCheckLogin = `SELECT u.username,u.mail,u.first,u.last from users as u where u.username=? AND u.password=?
    `;
    db.query(sqlCheckLogin, [username, password], (err: any, result: any) => {
      if (!result.length) {
        response.send("Error");
      } else {
        console.log(result);
        response.send(result);
      }
    });
  }
);

// this handles signup requests from clients
app.post(
  "/api/signup",
  (request: Express.Request, response: Express.Response) => {
    const username: string = request.body.username;
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const password: string = request.body.password;
    const sqlInsert = `INSERT INTO users (username, mail, first, last, password) VALUES
   (?,?,?,?,?)`;
    db.query(
      sqlInsert,
      [username, mail, firstName, lastName, password],
      (err: any, result: any) => {
        if (err) {
          response.send("Error");
        } else {
          response.send("Success");
        }
      }
    );
  }
);

// port + msg that says its listening
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
