import chalk from 'chalk';

import {
  ECoverageCheckStatus,
  EDiffFileStatus,
} from '../../../../constants/coverageGate.constants';
import { IDiffCoverageCheckResult } from '../../../../interfaces/coverage.interfaces';
import {
  ICoverageThresholdValue,
  IDiffCoverageThreshold,
} from '../../../../interfaces/threshold.interfaces';
import { presentMainText } from '../presentMainText';

export interface IDiffThresholdPresenterParams {
  result: IDiffCoverageCheckResult;
  threshold: IDiffCoverageThreshold;
}

const presentThresholdValue = (
  title: string,
  data: ICoverageThresholdValue,
  hasError: boolean
) => {
  const values = Object.entries(data)
    .map(([param, value]) => `${param} - ${value}%`)
    .join('\n');

  return presentMainText([chalk.bold(title), values].join('\n'), hasError);
};

export const presentDiffThreshold = ({
  result,
  threshold,
}: IDiffThresholdPresenterParams) => {
  const hasAddedError = Array.from(result.summary.values()).some(
    (value) =>
      value.status === ECoverageCheckStatus.ERROR &&
      value.file.status === EDiffFileStatus.ADDED
  );

  const hasModifiedError = Array.from(result.summary.values()).some(
    (value) =>
      value.status === ECoverageCheckStatus.ERROR &&
      value.file.status === EDiffFileStatus.MODIFIED
  );

  return [
    presentThresholdValue(
      'Diff coverage threshold for modified files:',
      threshold.modified,
      hasModifiedError
    ),
    presentThresholdValue(
      'Diff coverage threshold for added files:',
      threshold.added,
      hasAddedError
    ),
  ].join('\n\n');
};
