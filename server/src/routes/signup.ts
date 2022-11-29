import Express from 'express';
import mysql from 'mysql';

export const signup =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const username: string = request.body.username;
    const mail: string = request.body.mail;
    const firstName: string = request.body.firstName;
    const lastName: string = request.body.lastName;
    const password: string = request.body.password;
    const sqlInsert = `INSERT INTO users (username, mail, first, last, password) VALUES
   (?,?,?,?,?)`;
    mySQLDataBase.query(
      sqlInsert,
      [username, mail, firstName, lastName, password],
      (error: mysql.MysqlError | null): void => {
        if (error) response.send('Error');
        else response.send('Success');
      }
    );
  };
