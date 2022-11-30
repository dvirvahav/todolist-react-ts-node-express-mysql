import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const deleteTask =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const sqlDeleteTask: string = `DELETE from tasks where id=?;`;

    mySQLDataBase.query(
      sqlDeleteTask,
      [taskID],
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
