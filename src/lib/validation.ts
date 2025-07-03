import { z } from 'zod';

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
});

// Signup form validation
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
  role: z.enum(['tenant', 'owner', 'admin', 'vendor'], {
    required_error: 'Please select a role'
  }),
  unitNumber: z.string().optional(),
  propertyId: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
}).refine(data => {
  if (data.role === 'tenant' && !data.unitNumber) {
    return false;
  }
  return true;
}, {
  message: "Unit number is required for tenants",
  path: ["unitNumber"]
});

// Maintenance request validation
export const maintenanceRequestSchema = z.object({
  issue: z
    .string()
    .min(5, 'Issue description must be at least 5 characters')
    .max(100, 'Issue description must be less than 100 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  priority: z.enum(['High', 'Medium', 'Low'], {
    required_error: 'Please select a priority level'
  }),
  unit: z.string().min(1, 'Unit is required'),
  category: z.enum(['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'General'], {
    required_error: 'Please select a category'
  })
});

// Contact form validation
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
});

// Payment form validation
export const paymentSchema = z.object({
  amount: z
    .number()
    .min(0.01, 'Amount must be greater than 0')
    .max(10000, 'Amount cannot exceed $10,000'),
  method: z.enum(['credit_card', 'bank_transfer', 'check'], {
    required_error: 'Please select a payment method'
  }),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, 'Card number must be 16 digits')
    .optional(),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .optional(),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .optional()
}).refine(data => {
  if (data.method === 'credit_card') {
    return data.cardNumber && data.expiryDate && data.cvv;
  }
  return true;
}, {
  message: 'Credit card details are required for card payments',
  path: ['cardNumber']
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type MaintenanceRequestFormData = z.infer<typeof maintenanceRequestSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;

// Utility functions
export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const result = passwordSchema.safeParse(password);
  return {
    isValid: result.success,
    errors: result.success ? [] : result.error.errors.map(err => err.message)
  };
};

export const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['red', 'orange', 'yellow', 'blue', 'green'];
  
  return {
    score,
    label: labels[score] || 'Very Weak',
    color: colors[score] || 'red'
  };
};