import { Request, Response } from 'express'

export interface Route { 
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  handlers: ((req: Request, res: Response) => void)[]
}