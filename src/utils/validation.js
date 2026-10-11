import { parsePhoneNumberFromString } from "libphonenumber-js/max";
import { industries } from "../data/content.js";
export function validateLead(input) {
  const errors = {};
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { errors: { form: "Please provide a valid request." }, data: null };
  const data = {};
  for (const [key, max] of Object.entries({
    fullName: 120,
    phone: 32,
    email: 254,
    industry: 80,
    comments: 2000,
  })) {
    const value = input[key] ?? "";
    if (typeof value !== "string") {
      errors[key] = "Please enter text.";
      data[key] = "";
    } else {
      data[key] = value.trim();
      if (value.length > max)
        errors[key] = `Use no more than ${max} characters.`;
    }
  }
  if (!data.fullName) errors.fullName = "Please enter your full name.";
  const phone = parsePhoneNumberFromString(data.phone);
  if (!data.phone.startsWith("+") || !phone?.isValid())
    errors.phone = "Please enter a valid international phone number.";
  else data.phone = phone.number;
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (data.industry && !industries.includes(data.industry))
    errors.industry = "Please choose an industry from the list.";
  return { errors, data };
}
