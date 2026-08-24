export function isRequired(
  value: string
): boolean {
  return value.trim().length > 0;
}

export function isEmail(
  value: string
): boolean {
  return /\S+@\S+\.\S+/.test(value);
}

export function minLength(
  value: string,
  length: number
): boolean {
  return value.trim().length >= length;
}

export function isCNPJ(
  value: string
): boolean {
  const digits = value.replace(/\D/g, "");

  return digits.length === 14;
}

export function isPhone(
  value: string
): boolean {
  const digits = value.replace(/\D/g, "");

  return digits.length >= 10;
}