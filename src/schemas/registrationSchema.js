import { z } from 'zod';

// Step 1: Personal Info Validation Schema
export const step1Schema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .min(2, { message: 'Last name must be at least 2 characters' }),
  dob: z
    .string()
    .min(1, { message: 'Date of birth is required' })
    .refine((val) => {
      if (!val) return false;
      const date = new Date(val);
      const now = new Date();
      return date < now;
    }, { message: 'Date of birth must be in the past' }),
});

// Step 2: Account Details Validation Schema
export const step2Schema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email address is required' })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Please enter a valid email address (e.g., name@domain.com)' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Full Master Registration Schema
export const fullRegistrationSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'First name is required' })
      .min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z
      .string()
      .min(1, { message: 'Last name is required' })
      .min(2, { message: 'Last name must be at least 2 characters' }),
    dob: z
      .string()
      .min(1, { message: 'Date of birth is required' }),
    email: z
      .string()
      .min(1, { message: 'Email address is required' })
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
