import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const deleteTask =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const sqlDeleteTask: string = `DELETE from tasks where id=?;`;
    const sqlDeleteTaskHyperlinks: string =
      'DELETE from hyperlinks where taskID=?;';

    mySQLDataBase.query(
      sqlDeleteTaskHyperlinks,
      [taskID],
      (error: MysqlError | null) => {
        if (error) {
          response.send('Error');
          //  console.log(error);
        } else {
          response.send('OK');
          mySQLDataBase.query(
            sqlDeleteTask,
            [taskID],
            (error: MysqlError | null) => {
              if (error) {
                response.send('Error');
                console.log(error);
              } else {
                response.send('OK');
              }
            }
          );
        }
      }
    );
  };
