import { ECoverageCheckStatus } from '../constants/coverageGate.constants';

import { ICoverageFile, IDiffCoverageFile } from './coverageFiles.interfaces';
import { ICoverageParamsSummary } from './coverageParam.interfaces';
import { IDiffCoverageThreshold } from './threshold.interfaces';

export interface IFileCheckResult<F extends ICoverageFile = ICoverageFile> {
  summary: ICoverageParamsSummary;
  status: ECoverageCheckStatus;
  file: F;
}

export interface ICoverageCheckResult<F extends ICoverageFile = ICoverageFile> {
  summary: Map<string, IFileCheckResult<F>>;
  status: ECoverageCheckStatus;
}

export interface IDiffCoverageCheckResult
  extends ICoverageCheckResult<IDiffCoverageFile> {
  threshold: IDiffCoverageThreshold;
}
