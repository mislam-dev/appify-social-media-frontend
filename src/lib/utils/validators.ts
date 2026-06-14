export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const MIN_PASSWORD_LENGTH = 8;

export function isEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isStrongEnough(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}
