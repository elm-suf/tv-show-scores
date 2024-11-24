import { Request, Response } from 'express';

export async function handlePing(req: Request, res: Response) {
  try {
    console.log('Received ping :', req);

    res.status(200).json({ ping: 'pong' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}
