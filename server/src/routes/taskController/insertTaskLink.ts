import { Request, Response } from 'express';
import { Connection, MysqlError } from 'mysql';

export const insertTaskLink =
  (mySQLDataBase: Connection) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const hyperlink: string = request.body.hyperlink;
    const title: string = request.body.title;

    const sqlInsertTaskHyperlink: string = `INSERT INTO hyperlinks (taskID,title,hyperlink) VALUES (?,?,?)`;

    mySQLDataBase.query(
      sqlInsertTaskHyperlink,
      [taskID, title, hyperlink],
      (error: MysqlError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
        }
      }
    );
  };
