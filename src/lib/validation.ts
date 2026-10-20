import { z } from 'zod'

/**
 * Inquiry validation schema.
 *
 * NOTE: The limits below are mirrored by the Firestore Security Rules in
 * `firestore.rules`. Keep both in sync so client-side validation errors
 * match what the server would reject.
 */
export const INQUIRY_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 2000,
} as const

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(INQUIRY_LIMITS.nameMin, 'Please enter your name.')
    .max(INQUIRY_LIMITS.nameMax, `Name must be ${INQUIRY_LIMITS.nameMax} characters or fewer.`),
  email: z
    .email('Please enter a valid email address.')
    .max(INQUIRY_LIMITS.emailMax, 'Email address is too long.'),
  message: z
    .string()
    .trim()
    .min(INQUIRY_LIMITS.messageMin, 'Please describe your project in a few words (10+ characters).')
    .max(
      INQUIRY_LIMITS.messageMax,
      `Description must be ${INQUIRY_LIMITS.messageMax} characters or fewer.`,
    ),
})

export type InquiryInput = z.input<typeof inquirySchema>
