import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function assertEnv(
  value: unknown,
  name: string,
): asserts value is string {
  if (!value || typeof value !== "string") {
    throw new Error(`Missing env: ${name}`);
  }
}
