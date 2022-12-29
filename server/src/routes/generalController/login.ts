import { Request, Response } from 'express';
import { Connection, FieldInfo, MysqlError } from 'mysql';

export const login =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const username: string = request.body.username;
    const password: string = request.body.password;
    const sqlCheckLogin = `SELECT u.username,u.mail,u.first,u.last from users as u where u.username=? AND u.password=?
    `;

    mySQLDataBase.query(
      sqlCheckLogin,
      [username, password],
      (error: MysqlError | null, result: FieldInfo[]): void => {
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
