import { ECoverageCheckStatus } from '../../constants/coverageGate.constants';
import {
  ICoverageCheckResult,
  IFileCheckResult,
} from '../../interfaces/coverage.interfaces';
import { ICoverageFile } from '../../interfaces/coverageFiles.interfaces';
import { ICoverageThresholdValue } from '../../interfaces/threshold.interfaces';

import {
  ICoverageGateParams,
  ICoverageGateCheckParams,
} from './CoverageGate.interfaces';
import { checkCoverage } from './utils/checkCoverage';

export class CoverageGate {
  coverageMap: ICoverageGateParams['coverageMap'];

  constructor({ coverageMap }: ICoverageGateParams) {
    this.coverageMap = coverageMap;
  }

  check<F extends ICoverageFile>({
    files,
  }: ICoverageGateCheckParams<F>): ICoverageCheckResult<F> {
    const coverageFiles = files.getFiles();

    return Array.from(coverageFiles.values()).reduce<ICoverageCheckResult<F>>(
      (acc, value) => {
        const data = this.checkFileCoverage(
          value,
          files.getFileThreshold(value)
        );

        if (!data) {
          return acc;
        }

        if (data.status === ECoverageCheckStatus.ERROR) {
          acc.status = ECoverageCheckStatus.ERROR;
        }

        acc.summary.set(value.filePath, data);

        return acc;
      },
      {
        summary: new Map(),
        status: ECoverageCheckStatus.SUCCESS,
      }
    );
  }

  checkFileCoverage<F extends ICoverageFile>(
    file: F,
    threshold: ICoverageThresholdValue
  ): IFileCheckResult<F> | null {
    const summary = this.getFileCoverageSummary(file);

    if (!summary) {
      return null;
    }

    return {
      file,
      ...checkCoverage(summary, threshold),
    };
  }

  getFileCoverageSummary(file: ICoverageFile) {
    return this.coverageMap.get(file.filePath) ?? null;
  }
}
