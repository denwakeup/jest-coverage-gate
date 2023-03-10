import type { CoverageSummaryData } from 'istanbul-lib-coverage';

import { ECoverageCheckStatus } from '../constants/coverageGate.constants';

export type ICoverageParam = keyof CoverageSummaryData;

export interface ICoverageParamCheckResult {
  expected: number;
  current: number;
  status: ECoverageCheckStatus;
}

export type ICoverageParamsSummary = Partial<
  Record<ICoverageParam, ICoverageParamCheckResult>
>;
