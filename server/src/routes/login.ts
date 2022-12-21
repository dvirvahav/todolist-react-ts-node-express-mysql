import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { RowDataPacket } from 'mysql2/typings/mysql/lib/protocol/packets';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const login =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const username: string = request.body.username;
    const password: string = request.body.password;
    const sqlCheckLogin = `SELECT u.username,u.mail,u.first,u.last from users as u where u.username=? AND u.password=?
    `;

    mySQLDataBase.execute(
      sqlCheckLogin,
      [username, password],
      (error: QueryError | null, result: RowDataPacket[]): void => {
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
