import Express from 'express';
import mysql from 'mysql';

export const deleteList =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const listID: string = request.body.listID;

    const sqlDeleteTasks = `DELETE from tasks where list_id=?;`;
    const sqlDeleteList = `DELETE from lists where id=?;`;
    mySQLDataBase.query(
      sqlDeleteTasks,
      [listID],
      (error: mysql.MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            sqlDeleteList,
            [listID],
            (error: mysql.MysqlError | null): void => {
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
