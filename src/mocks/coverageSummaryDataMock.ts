import type { CoverageSummaryData } from 'istanbul-lib-coverage';

export const coverageSummaryDataMock: Partial<CoverageSummaryData> = {
  lines: {
    total: 30,
    covered: 20,
    skipped: 10,
    pct: 60,
  },
  branches: {
    total: 30,
    covered: 20,
    skipped: 10,
    pct: 60,
  },
  functions: {
    total: 30,
    covered: 20,
    skipped: 10,
    pct: 60,
  },
};
