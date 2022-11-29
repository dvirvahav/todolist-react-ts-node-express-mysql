import Express from 'express';
import mysql from 'mysql';

export const login =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const username: string = request.body.username;
    const password: string = request.body.password;

    const sqlCheckLogin = `SELECT u.username,u.mail,u.first,u.last from users as u where u.username=? AND u.password=?
    `;
    mySQLDataBase.query(
      sqlCheckLogin,
      [username, password],
      (error: mysql.MysqlError | null, result: mysql.FieldInfo[]): void => {
        if (!result.length) {
          response.send('Error');
          console.log(error);
        } else {
          console.log(result);
          response.send(result);
        }
      }
    );
  };
