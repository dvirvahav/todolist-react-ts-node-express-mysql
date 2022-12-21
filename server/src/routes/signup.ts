import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const signup =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const username: string = request.body.username;
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const password: string = request.body.password;
    const sqlInsert: string = `INSERT INTO users (username, mail, first, last, password) VALUES
   (?,?,?,?,?)`;

    mySQLDataBase.execute(
      sqlInsert,
      [username, mail, firstName, lastName, password],
      (error: QueryError | null): void => {
        if (error) response.send('Error');
        else response.send('Success');
      }
    );
  };
