import { ECoverageCheckStatus } from '../../constants/coverageGate.constants';
import {
  IDiffCoverageCheckResult,
  IFileCheckResult,
} from '../../interfaces/coverage.interfaces';
import { IDiffCoverageFile } from '../../interfaces/coverageFiles.interfaces';
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

  check({ files }: ICoverageGateCheckParams): IDiffCoverageCheckResult {
    const coverageFiles = files.getFiles();

    return Array.from(coverageFiles.values()).reduce<IDiffCoverageCheckResult>(
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

  checkFileCoverage(
    file: IDiffCoverageFile,
    threshold: ICoverageThresholdValue
  ): IFileCheckResult | null {
    const summary = this.getFileCoverageSummary(file);

    if (!summary) {
      return null;
    }

    return {
      file,
      ...checkCoverage(summary, threshold),
    };
  }

  getFileCoverageSummary(file: IDiffCoverageFile) {
    return this.coverageMap.get(file.filePath) ?? null;
  }
}
