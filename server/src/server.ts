import cors from 'cors';
import { Connection, createConnection } from 'mysql';
import Express from 'express';
import bodyParser from 'body-parser';
import { getAllData } from './routes/getAllData';
import { insertList } from './routes/insertList';
import { insertTask } from './routes/InsertTask';
import { login } from './routes/login';
import { deleteList } from './routes/deleteList';
import { deleteTask } from './routes/deleteTask';
import { signup } from './routes/signup';
import { updateListName } from './routes/updateListName';
import { updateTaskName } from './routes/updateTaskName';
import { updateTaskStatus } from './routes/updateTaskStatus';
import { insertTaskLink } from './routes/insertTaskLink';

const app = Express();
const serverPort: number = 5000;
const mySQLDataBase: Connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todolist',
});

app.use(cors());
app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/updateTaskStatus', updateTaskStatus(mySQLDataBase));

app.post('/api/insertTaskLink', insertTaskLink(mySQLDataBase));

app.post('/api/getAllData', getAllData(mySQLDataBase));

app.post('/api/removeTask', deleteTask(mySQLDataBase));

app.post('/api/removeList', deleteList(mySQLDataBase));

app.post('/api/updateTask', updateTaskName(mySQLDataBase));

app.post('/api/updateList', updateListName(mySQLDataBase));

app.post('/api/insertTask', insertTask(mySQLDataBase));

app.post('/api/insertList', insertList(mySQLDataBase));

app.post('/api/login', login(mySQLDataBase));

app.post('/api/signup', signup(mySQLDataBase));

app.listen(serverPort, () => {
  return console.log(`Express is listening at http://localhost:${serverPort}`);
});
