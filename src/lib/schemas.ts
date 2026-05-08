import { z } from "zod";

export const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  address: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is too short"),
  state: z.string().min(2, "State is too short"),
  zipCode: z.string().min(5, "Zip code is too short"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  paymentMethod: z.enum(["card", "upi", "cod"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
