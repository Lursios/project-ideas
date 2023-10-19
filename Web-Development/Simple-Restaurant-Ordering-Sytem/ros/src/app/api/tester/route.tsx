// pages/api/myEndpoint.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  // Handle incoming requests here
  res.status(200).json({ message: 'API endpoint is working' });
};
