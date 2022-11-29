import Express from 'express';
import mysql from 'mysql';

export const deleteTask =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const taskID: string = request.body.taskID;
    const sqlDeleteTask = `DELETE from tasks where id=?;`;

    mySQLDataBase.query(
      sqlDeleteTask,
      [taskID],
      (error: mysql.MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
        }
      }
    );
  };
