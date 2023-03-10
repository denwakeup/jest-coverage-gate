import { ECoverageCheckStatus } from '../../../constants/coverageGate.constants';

export const compareCoverageValue = (
  expected: number,
  current: number
): ECoverageCheckStatus =>
  expected > current
    ? ECoverageCheckStatus.ERROR
    : ECoverageCheckStatus.SUCCESS;
