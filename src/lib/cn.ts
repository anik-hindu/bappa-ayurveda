import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and resolves Tailwind CSS class conflicts.
 *
 * @param inputs - Array of class values (strings, objects, arrays, booleans, undefined, null)
 * @returns Filtered and merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
