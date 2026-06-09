export type DayType = 'push' | 'legs' | 'pull' | 'core';
export type Unit = 'reps' | 'secs';

export interface Exercise {
  key: string;
  name: string;
  sets: number;
  unit: Unit;
  /** [min, max] — hitting max on every set triggers a level-up suggestion. */
  range: [number, number];
  /** Progression variations, easiest first. */
  path: string[];
  note?: string;
  /** main moves count toward completion; finishers do not. */
  main: boolean;
}

export interface Day {
  type: DayType;
  title: string;
  focus: string;
  exercises: Exercise[];
}

export interface Profile {
  id: string;
  display_name: string;
}

export interface Session {
  id: string;
  user_id: string;
  on_date: string;
  day_type: DayType;
  floor_mode: boolean;
  /** Per-day "had my ~30g protein" flag — the one nutrition lever the app tracks. */
  protein_hit: boolean;
  completed_at: string | null;
}

export interface SetLog {
  id: string;
  session_id: string;
  user_id: string;
  exercise_key: string;
  set_number: number;
  value: number;
  step_index: number;
}

export interface ProgressionRow {
  user_id: string;
  exercise_key: string;
  step_index: number;
}
