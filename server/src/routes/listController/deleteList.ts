import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';
export const deleteList =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const listID: string = request.body.listID;
    const sqlDeleteTasks: string = `DELETE from tasks where list_id=?;`;
    const sqlDeleteList: string = `DELETE from lists where id=?;`;

    mySQLDataBase.query(
      sqlDeleteTasks,
      [listID],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            sqlDeleteList,
            [listID],
            (error: MysqlError | null): void => {
              if (error) {
                response.send('Error');
                console.log(error);
              }
              response.send('OK');
            }
          );
        }
      }
    );
  };
