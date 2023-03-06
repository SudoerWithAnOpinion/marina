import path from 'node:path';
import fs from 'node:fs/promises';

const uploadPath = path.resolve('./static/uploads');

export const initUploadPath = async () => {
  await fs.mkdir(uploadPath, {
    recursive: true
  });
};
