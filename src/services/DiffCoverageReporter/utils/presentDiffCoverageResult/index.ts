import chalk from 'chalk';

import { ECoverageCheckStatus } from '../../../../constants/coverageGate.constants';
import { presentMainText } from '../presentMainText';

import {
  presentDiffCoverageTable,
  IDiffCoverageTablePresenterParams,
} from './presentDiffCoverageTable';
import { presentDiffThreshold } from './presentDiffThreshold';

export const presentDiffCoverageResult = ({
  result,
  rootDir,
  threshold,
}: IDiffCoverageTablePresenterParams): string => {
  const hasError = result.status !== ECoverageCheckStatus.SUCCESS;

  const title = chalk.bold(
    hasError
      ? `Diff coverage quality gate failed:`
      : `Diff coverage quality gate succeeded:`
  );

  return [
    '\n',
    presentMainText(title, hasError),
    '\n',
    '\n',
    presentDiffCoverageTable({
      result,
      rootDir,
      threshold,
    }),
    '\n',
    '\n',
    presentDiffThreshold({ result, threshold }),
    '\n',
  ].join('');
};
