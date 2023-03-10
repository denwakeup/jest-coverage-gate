import type { Config } from '@jest/reporters';

import { IDiffCoverageThreshold } from '../../../interfaces/threshold.interfaces';

interface IParams {
  coverageThreshold?: Config.GlobalConfig['coverageThreshold'];
  diffThresholds?: Partial<IDiffCoverageThreshold>;
}

export const mergeThresholds = ({
  coverageThreshold,
  diffThresholds,
}: IParams): IDiffCoverageThreshold => ({
  added: {
    ...coverageThreshold?.global,
    ...diffThresholds?.added,
  },
  modified: {
    ...coverageThreshold?.global,
    ...diffThresholds?.modified,
  },
});
