import { z } from 'zod';

/**
 * Must be at least 4 characters long
 * Will be trimmed
 */
export const username = z.string().min(4, 'Username must be at least 4 characters long').trim();

export const noWhitespace = (input: string, ctx: z.RefinementCtx) => {
  if (/\s/g.test(input)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Usernames cannot contain whitespaces'
    });
  }
};
export const usernameValidator = username.superRefine((usernanme, ctx) => {
  noWhitespace(usernanme, ctx);
});
