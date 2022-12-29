import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const updateTaskName =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const newName: string = request.body.newName;
    const sqlUpdateTaskName: string = `UPDATE tasks
    SET name=?
    WHERE id=?;`;

    mySQLDataBase.query(
      sqlUpdateTaskName,
      [newName, taskID],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
        }
      }
    );
  };
