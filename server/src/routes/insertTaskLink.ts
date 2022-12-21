import { Request, Response } from 'express';
import { Pool } from 'mysql2';
import { QueryError } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

export const insertTaskLink =
  (mySQLDataBase: Pool) => (request: Request, response: Response) => {
    const taskID: string = request.body.taskID;
    const hyperlink: string = request.body.hyperlink;
    const title: string = request.body.title;

    const sqlInsertTaskHyperlink: string = `INSERT INTO hyperlinks (taskID,title,hyperlink) VALUES (?,?,?)`;

    mySQLDataBase.execute(
      sqlInsertTaskHyperlink,
      [taskID, title, hyperlink],
      (error: QueryError | null): void => {
        if (error) {
          response.send('Error');
          console.log(error);
        } else {
          response.send('OK');
        }
      }
    );
  };
