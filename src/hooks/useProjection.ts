/**
 * useProjection — runs the engine reactively when config changes.
 *
 * Returns the latest ProjectionResult, recomputed on every config change.
 * Uses useMemo for synchronous computation (engine is fast enough in-browser).
 */

import { useMemo } from 'react';
import type { PlannerConfig, ProjectionResult } from '../engine/types';
import { runProjection } from '../engine/projection';

export function useProjection(config: PlannerConfig): ProjectionResult {
  return useMemo(() => runProjection(config), [config]);
}
