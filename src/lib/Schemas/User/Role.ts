import { z } from 'zod';

export const role = z.nullable(z.enum(['ADMINSTRATOR', 'USER'])).optional();
