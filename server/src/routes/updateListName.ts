import Express from 'express';
import mysql from 'mysql';

export const updateListName =
  (mySQLDataBase: mysql.Connection) =>
  (request: Express.Request, response: Express.Response) => {
    const listID: string = request.body.listID;
    const newName: string = request.body.newName;

    const sqlUpdateListName = `UPDATE lists
    SET name=?
    WHERE id=?;`;

    mySQLDataBase.query(
      sqlUpdateListName,
      [newName, listID],
      (error: mysql.MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        }
      }
    );
  };
