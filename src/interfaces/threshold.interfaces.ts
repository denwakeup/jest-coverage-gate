import type { Config } from '@jest/reporters';

export type ICoverageThreshold = Exclude<
  Config.GlobalConfig['coverageThreshold'],
  undefined
>;

export type ICoverageThresholdValue = ICoverageThreshold['global'];

export interface IDiffCoverageThreshold {
  added: ICoverageThresholdValue;
  modified: ICoverageThresholdValue;
}
