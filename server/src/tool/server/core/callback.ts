import { Request, Response } from 'express';

export type Callback = (req?: Request, res?: Response) => 
void | Promise<void>