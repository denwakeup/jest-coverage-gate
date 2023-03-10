import type { CoverageSummaryData } from 'istanbul-lib-coverage';

import { ICoverageThresholdValue } from '../../../interfaces/threshold.interfaces';
import { ECoverageCheckStatus } from '../../../constants/coverageGate.constants';
import { ICoverageParamsSummary } from '../../../interfaces/coverageParam.interfaces';

import { checkCoverageParam } from './checkCoverageParam';

interface IResult {
  summary: ICoverageParamsSummary;
  status: ECoverageCheckStatus;
}

export const checkCoverage = (
  summary: Partial<CoverageSummaryData>,
  threshold: ICoverageThresholdValue
) =>
  Object.entries(threshold).reduce<IResult>(
    (acc, data) => {
      const [coverageKey, expected] = data as [
        keyof typeof threshold,
        (typeof threshold)[keyof typeof threshold]
      ];

      const keyCheckResult = checkCoverageParam(summary[coverageKey], expected);

      if (!keyCheckResult) {
        return acc;
      }

      return {
        ...acc,
        summary: {
          ...acc.summary,
          [coverageKey]: keyCheckResult,
        },
        status:
          keyCheckResult.status === ECoverageCheckStatus.ERROR
            ? keyCheckResult.status
            : acc.status,
      };
    },
    {
      summary: {},
      status: ECoverageCheckStatus.SUCCESS,
    }
  );
