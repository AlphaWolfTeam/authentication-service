import { pipeline } from 'stream';
import { promisify } from 'util';

// eslint-disable-next-line import/prefer-default-export
export const promisePipe = promisify(pipeline);
