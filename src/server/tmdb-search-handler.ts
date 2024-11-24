import { Request, Response } from 'express';

/**
 * Handles TMDb search API requests
 */
export async function handleTmdbSearch(req: Request, res: Response) {
  try {
    console.log('Received search request:', req.query);

    const params = new URLSearchParams(req.query as Record<string, string>);
    const url = `https://api.themoviedb.org/3/search/tv?${params}`;
    const apiKey = process.env['TMDB_API_TOKEN'];

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`TMDb API error: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data);
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
