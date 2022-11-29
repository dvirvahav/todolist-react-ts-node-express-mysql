import Express from 'express';
import mysql from 'mysql';

export const updateTaskStatus =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const taskID: string = request.body.taskID;
    const itemStatus: string = request.body.itemStatus;
    const sqlDeleteTask = `UPDATE tasks
    SET 
        status = ?
    WHERE
        id = ?;`;

    mySQLDataBase.query(
      sqlDeleteTask,
      [itemStatus, taskID],
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
