import { describe, it, expect } from 'vitest';
import { DAYS } from '../program';
import type { Exercise } from '../types';
import { GUIDES, guideFor } from './all';
import { GUIDABLE_KEYS, isGuidable } from './index';

// Every guidable exercise key across the whole program (push/legs/pull).
const exercises: Exercise[] = Object.values(DAYS).flatMap((d) => d.exercises);

describe('illustration registry', () => {
  it('the eager GUIDABLE_KEYS set stays in sync with the lazy GUIDES map', () => {
    expect([...GUIDABLE_KEYS].sort()).toEqual(Object.keys(GUIDES).sort());
    for (const key of Object.keys(GUIDES)) {
      expect(isGuidable(key), `isGuidable("${key}")`).toBe(true);
    }
    expect(isGuidable('not_a_key')).toBe(false);
  });

  it('covers every exercise key with a guides array of matching length', () => {
    for (const ex of exercises) {
      const guides = GUIDES[ex.key];
      expect(guides, `missing GUIDES entry for "${ex.key}"`).toBeDefined();
      expect(
        guides.length,
        `GUIDES["${ex.key}"] length must match path length`,
      ).toBe(ex.path.length);
    }
  });

  it('every guide has exactly 3 non-empty cues and an Art component', () => {
    for (const ex of exercises) {
      const guides = GUIDES[ex.key] ?? [];
      guides.forEach((g, i) => {
        expect(g.Art, `${ex.key}[${i}] Art`).toBeTypeOf('function');
        expect(g.cues, `${ex.key}[${i}] cues`).toHaveLength(3);
        for (const cue of g.cues) {
          expect(
            cue.trim().length,
            `${ex.key}[${i}] has an empty cue`,
          ).toBeGreaterThan(0);
        }
      });
    }
  });

  it('guideFor resolves each current-step variation and rejects bad input', () => {
    for (const ex of exercises) {
      expect(guideFor(ex.key, 0)).not.toBeNull();
      expect(guideFor(ex.key, ex.path.length)).toBeNull();
    }
    expect(guideFor('not_a_key', 0)).toBeNull();
  });
});
