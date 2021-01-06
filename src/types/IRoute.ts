import { RequestHandler } from 'express'

export interface IRoute { 
    url: string
    method: 'get' | 'post' | 'put' | 'delete'
    handler: RequestHandler }