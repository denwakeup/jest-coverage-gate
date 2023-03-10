import { EDiffFileStatus } from '../constants/coverageGate.constants';

export interface IDiffCoverageFile {
  filePath: string;
  status: EDiffFileStatus;
}

export type IDiffCoverageFileMap = Map<string, IDiffCoverageFile>;
