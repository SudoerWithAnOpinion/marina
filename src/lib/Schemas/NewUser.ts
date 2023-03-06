import { z, type SafeParseReturnType } from 'zod';

import { username, noWhitespace } from './User/Username';
import { password } from './User/Password';
import { role } from './User/Role';
/**
 * Used for creating a new user with a confirmed password
 */
export const newSetupUserSchema = z.object({
  username,
  newPassword: password,
  confirmPassword: password
});
export const newSetupUserValidationSchema = newSetupUserSchema.superRefine(
  ({ username, newPassword, confirmPassword }, ctx) => {
    noWhitespace(username, ctx);
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password and confirm password do not match'
      });
    }
  }
);

/**
 * Used for creating a new user using an administator account
 * Optionally specify a role
 */
export const newUser = z.object({
  username,
  password,
  role,
  groups: z.array(z.string())
});
