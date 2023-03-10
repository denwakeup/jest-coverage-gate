import { ECoverageCheckStatus } from '../constants/coverageGate.constants';

import { IDiffCoverageFile } from './coverageFiles.interfaces';
import { ICoverageParamsSummary } from './coverageParam.interfaces';

export interface IFileCheckResult {
  summary: ICoverageParamsSummary;
  status: ECoverageCheckStatus;
  file: IDiffCoverageFile;
}

export interface IDiffCoverageCheckResult {
  summary: Map<string, IFileCheckResult>;
  status: ECoverageCheckStatus;
}
