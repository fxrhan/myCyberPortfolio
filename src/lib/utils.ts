import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const SWIPE_CONFIDENCE_THRESHOLD = 10000;

export function swipePower(offset: number, velocity: number): number {
    return Math.abs(offset) * velocity;
}
