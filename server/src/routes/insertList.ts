import Express from 'express';
import mysql from 'mysql';

export const insertList =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const listName: string = request.body.listName;
    const username: string = request.body.username;
    const sqlInsertList = `INSERT INTO lists (username,name) VALUES
    (?,?)`;

    mySQLDataBase.query(
      sqlInsertList,
      [username, listName],
      (error: mysql.MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          mySQLDataBase.query(
            'SELECT max(id) as id from lists where username=?',
            username,
            (
              error: mysql.MysqlError | null,
              result: mysql.FieldInfo[]
            ): void => {
              if (error) {
                response.send('Error');
                console.log(error);
              } else response.send(result);
            }
          );
        }
      }
    );
  };
