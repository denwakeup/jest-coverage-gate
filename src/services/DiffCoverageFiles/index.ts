import { IDiffCoverageFile } from '../../interfaces/coverageFiles.interfaces';
import {
  ICoverageThresholdValue,
  IDiffCoverageThreshold,
} from '../../interfaces/threshold.interfaces';
import { EDiffFileStatus } from '../../constants/coverageGate.constants';
import { ICoverageGateFiles } from '../CoverageGate/CoverageGate.interfaces';

import { getGitChangedFiles } from './utils/getGitChangedFiles';

interface IParams {
  since: string;
  rootDir: string;
  threshold: IDiffCoverageThreshold;
}

export class DiffCoverageFiles implements ICoverageGateFiles {
  private since: string;
  private rootDir: string;

  threshold: IDiffCoverageThreshold;

  constructor({ since, rootDir, threshold }: IParams) {
    this.rootDir = rootDir;
    this.since = since;
    this.threshold = threshold;
  }

  getFiles() {
    return getGitChangedFiles({
      rootDir: this.rootDir,
      since: this.since,
    });
  }

  getFileThreshold(file: IDiffCoverageFile): ICoverageThresholdValue {
    switch (file.status) {
      case EDiffFileStatus.ADDED:
        return this.threshold.added;

      case EDiffFileStatus.MODIFIED:
        return this.threshold.modified;
    }
  }
}
