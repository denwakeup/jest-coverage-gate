import type { CoverageSummary } from 'istanbul-lib-coverage';

import {
  IDiffCoverageFileMap,
  IDiffCoverageFile,
} from '../../interfaces/coverageFiles.interfaces';
import { ICoverageThresholdValue } from '../../interfaces/threshold.interfaces';

export interface ICoverageGateParams {
  coverageMap: Map<string, CoverageSummary>;
}

export interface ICoverageGateFiles {
  getFiles(): IDiffCoverageFileMap;
  getFileThreshold(file: IDiffCoverageFile): ICoverageThresholdValue;
}

export interface ICoverageGateCheckParams {
  files: ICoverageGateFiles;
}
