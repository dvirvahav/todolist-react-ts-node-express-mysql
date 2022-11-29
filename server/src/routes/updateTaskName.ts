import Express from 'express';
import mysql from 'mysql';

export const updateTaskName =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const taskID: string = request.body.taskID;
    const newName: string = request.body.newName;
    const sqlUpdateTaskName = `UPDATE tasks
    SET name=?
    WHERE id=?;`;

    mySQLDataBase.query(
      sqlUpdateTaskName,
      [newName, taskID],
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
