import { RequestHandler } from 'express'

export interface Route { 
    url: string
    method: 'get' | 'post' | 'put' | 'delete'
    handler: RequestHandler }