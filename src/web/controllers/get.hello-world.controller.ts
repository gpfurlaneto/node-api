import { Request, Response } from "express";

export default {
  method: 'get',
  url: '/hello-world',
  handlers: [(_request: Request, response: Response) => {
    response.send('Hello world node api!')
  }]
}