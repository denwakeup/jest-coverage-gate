import { EDiffFileStatus } from '../constants/coverageGate.constants';

export interface ICoverageFile {
  filePath: string;
}

export interface IDiffCoverageFile extends ICoverageFile {
  status: EDiffFileStatus;
}

export type ICoverageFilesMap<F extends ICoverageFile = ICoverageFile> = Map<
  string,
  F
>;

export type IDiffCoverageFileMap = ICoverageFilesMap<IDiffCoverageFile>;
