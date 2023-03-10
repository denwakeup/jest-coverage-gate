import type { Totals } from 'istanbul-lib-coverage';

import { ICoverageParamCheckResult } from '../../../interfaces/coverageParam.interfaces';

import { compareCoverageValue } from './compareCoverageValue';

export const checkCoverageParam = (
  currentData?: Totals,
  expected?: number
): ICoverageParamCheckResult | null => {
  if (typeof expected === 'undefined' || typeof currentData === 'undefined') {
    return null;
  }

  return {
    expected,
    current: currentData.pct,
    status: compareCoverageValue(expected, currentData.pct),
  };
};
