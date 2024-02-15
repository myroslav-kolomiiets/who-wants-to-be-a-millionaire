import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const jsonDirectory = path.join(process.cwd(), 'src/utils');
  const fileContents = await fs.readFile(
    path.join(jsonDirectory, 'gameConfig.json'),
    'utf8',
  );
  res.status(200).json(JSON.parse(fileContents));
}
