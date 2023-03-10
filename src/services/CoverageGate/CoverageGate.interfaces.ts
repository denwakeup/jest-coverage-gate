import type { CoverageSummary } from 'istanbul-lib-coverage';

import {
  ICoverageFile,
  ICoverageFilesMap,
} from '../../interfaces/coverageFiles.interfaces';
import { ICoverageThresholdValue } from '../../interfaces/threshold.interfaces';

export interface ICoverageGateParams {
  coverageMap: Map<string, CoverageSummary>;
}

export interface ICoverageGateFiles<F extends ICoverageFile = ICoverageFile> {
  getFiles(): ICoverageFilesMap<F>;
  getFileThreshold(file: ICoverageFile): ICoverageThresholdValue;
}

export interface ICoverageGateCheckParams<
  F extends ICoverageFile = ICoverageFile
> {
  files: ICoverageGateFiles<F>;
}
