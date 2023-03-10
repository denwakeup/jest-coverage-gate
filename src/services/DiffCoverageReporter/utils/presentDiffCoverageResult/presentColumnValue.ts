import chalk from 'chalk';

import { ECoverageCheckStatus } from '../../../../constants/coverageGate.constants';
import { presentMainText } from '../presentMainText';

export const presentColumnValue = (
  value: string | number,
  status?: ECoverageCheckStatus
) => {
  if (typeof status === 'undefined') {
    return chalk.white(value);
  }

  return presentMainText(value, status === ECoverageCheckStatus.ERROR);
};
