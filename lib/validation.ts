import { z } from 'zod';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

export const projectTypeOptions = [
  'web_development',
  'mobile_app',
  'ui_ux_design',
  'full_stack',
  'other'
] as const;

export const customerFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (phone) => {
        try {
          const phoneNumber = parsePhoneNumber(phone);
          return isValidPhoneNumber(phone) && phoneNumber.isValid();
        } catch {
          return false;
        }
      },
      'Please enter a valid international phone number (e.g., +1 555-123-4567)'
    ),

  company: z
    .string()
    .max(100, 'Company name cannot exceed 100 characters')
    .optional()
    .or(z.literal('')),

  projectType: z
    .enum(projectTypeOptions, {
      errorMap: () => ({ message: 'Please select a project type' })
    }),

  projectDetails: z
    .string()
    .min(10, 'Project details must be at least 10 characters')
    .max(2000, 'Project details cannot exceed 2000 characters')
    .trim()
});

export type CustomerFormData = z.infer<typeof customerFormSchema>;

export const customerSchemaForDB = customerFormSchema.extend({
  status: z.enum(['new', 'contacted', 'in_progress', 'completed']).default('new'),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date())
});

export type CustomerDocument = z.infer<typeof customerSchemaForDB> & {
  _id: string;
};