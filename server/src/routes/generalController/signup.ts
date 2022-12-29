import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const signup =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const username: string = request.body.username;
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const password: string = request.body.password;
    const sqlInsert: string = `INSERT INTO users (username, mail, first, last, password) VALUES
   (?,?,?,?,?)`;

    mySQLDataBase.query(
      sqlInsert,
      [username, mail, firstName, lastName, password],
      (error: MysqlError | null): void => {
        if (error) response.status(500).send('Error');
        else response.send('Success');
      }
    );
  };
