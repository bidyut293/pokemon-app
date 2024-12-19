// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatStatName(statName: string): string {
  return statName
    .split('-')
    .map(capitalize)
    .join(' ');
}

export function calculateStatPercentage(value: number): number {
  const MAX_STAT_VALUE = 255;
  return (value / MAX_STAT_VALUE) * 100;
}