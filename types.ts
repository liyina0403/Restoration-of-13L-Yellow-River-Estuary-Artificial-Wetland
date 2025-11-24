
export enum Section {
  OVERVIEW = 'OVERVIEW',
  PRODUCTION = 'PRODUCTION', // 1
  FUNCTION = 'FUNCTION',     // 3
  SHORELINE = 'SHORELINE',   // L
  AI_LAB = 'AI_LAB'
}

export interface ChartData {
  name: string;
  value: number;
  type?: string;
}

export interface ZoneInfo {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

export type Language = 'en' | 'zh';
